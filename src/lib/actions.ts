"use server";

import {
  ProductFormData,
  ProductSchema,
  RegisterSchema,
  SignInSchema,
} from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";
import { subDays, format, endOfMonth } from "date-fns";
import { revalidatePath } from "next/cache";

//Sign Up
export const signUpCredentials = async (
  _prevState: unknown,
  formData: FormData
) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Registration:", error);
    return { message: "Gagal mendaftarkan" };
  }
  redirect("/login");
};

// Sign In credentials action
export const signInCredentials = async (
  _prevState: unknown,
  formData: FormData
) => {
  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true },
    });

    if (!user) {
      return { message: "Kredensial Tidak Valid." };
    }

    const redirectUrl =
      user.role === "admin" ? "/admin/dashboard" : "/dashboard";

    await signIn("credentials", { email, password, redirectTo: redirectUrl });
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Kredensial Tidak Valid." };
        default:
          return { message: "Terjadi kesalahan. silakan coba lagi" };
      }
    }
    throw error;
  }
};

//Sign Out
export const signOutAction = async () => {
  (await cookies()).delete("next-auth.session-token");
  (await cookies()).delete("__Secure-next-auth.session-token");
  (await cookies()).delete("next-auth.callback-url");
  (await cookies()).delete("next-auth.csrf-token");

  redirect("/login");
};

//
export async function getDashboardStats(
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear()
) {
  const start = new Date(year, month - 1, 1);
  const end = endOfMonth(start);

  const [totalProducts, totalOrders, totalRevenue, orderStatusCounts] =
    await Promise.all([
      prisma.product.count({ where: { isActive: true } }),

      prisma.order.count({
        where: { createdAt: { gte: start, lte: end } },
      }),

      prisma.order.aggregate({
        where: { createdAt: { gte: start, lte: end } },
        _sum: { total: true },
      }),

      prisma.order.groupBy({
        by: ["status"],
        _count: true,
      }),
    ]);

  const statusMap = orderStatusCounts.reduce((acc, item) => {
    acc[item.status] = item._count;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalProducts,
    totalOrders,
    totalRevenue: totalRevenue._sum.total || 0,
    orderStatus: {
      pending: statusMap["PENDING"] || 0,
      shipped: statusMap["SHIPPED"] || 0,
      completed: statusMap["COMPLETED"] || 0,
    },
  };
}

// (get) ambil data penjualan harian
export async function getDailySalesData() {
  const today = new Date();
  const thirtyDaysAgo = subDays(today, 29);

  const rawSales = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: thirtyDaysAgo,
        lte: today,
      },
    },
    select: {
      createdAt: true,
      total: true,
    },
  });
  const dailyTotals: Record<string, number> = {};

  // Inisialisasi 30 hari terakhir ke 0
  for (let i = 0; i < 30; i++) {
    const date = format(subDays(today, i), "yyyy-MM-dd");
    dailyTotals[date] = 0;
  }

  for (const order of rawSales) {
    const date = format(order.createdAt, "yyyy-MM-dd");
    dailyTotals[date] = (dailyTotals[date] || 0) + Number(order.total);
  }

  const sorted = Object.entries(dailyTotals)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, total]) => ({
      date: format(new Date(date), "dd MMM"),
      total,
    }));

  return sorted;
}

// Helper function to get the current user ID
export async function getCurrentUserId() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  return session.user.id;
}

// Helper function to check if the current user is an admin
export async function isCurrentUserAdmin() {
  const session = await auth();

  if (!session?.user?.role) {
    return false;
  }

  return session.user.role === "admin";
}

// Create a new product
export async function createProduct(formData: ProductFormData) {
  try {
    // Check if user is admin
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return {
        success: false,
        error: "Unauthorized: Only admins can create products",
      };
    }

    // Validate the form data
    const validatedData = ProductSchema.parse(formData);

    // Get the current user ID
    const userId = await getCurrentUserId();

    // Create the product in the database
    const product = await prisma.product.create({
      data: {
        name: validatedData.name,
        price: Math.round(validatedData.price), // Assuming price is already in the correct format
        stock: validatedData.stock,
        description: validatedData.description,
        category: validatedData.category,
        imageUrl: validatedData.image ? "/placeholder.svg" : null, // Replace with actual image upload logic
        userId: userId,
      },
    });

    // Revalidate the products page to show the new product
    revalidatePath("/admin/product");

    return { success: true, product };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

// Update an existing product
export async function updateProduct(id: string, formData: ProductFormData) {
  try {
    // Check if user is admin
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return {
        success: false,
        error: "Unauthorized: Only admins can update products",
      };
    }

    // Validate the form data
    const validatedData = ProductSchema.parse(formData);

    // Check if the product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return { success: false, error: "Product not found" };
    }

    // Update the product in the database
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: validatedData.name,
        price: Math.round(validatedData.price), // Assuming price is already in the correct format
        stock: validatedData.stock,
        description: validatedData.description,
        category: validatedData.category,
        // Only update the image if a new one was provided
        ...(formData.image && { imageUrl: "/placeholder.svg" }), // Replace with actual image upload logic
      },
    });

    // Revalidate the products page to show the updated product
    revalidatePath("/admin/product");

    return { success: true, product };
  } catch (error) {
    console.error(`Failed to update product ${id}:`, error);
    return { success: false, error: "Failed to update product" };
  }
}

// Delete a product
export async function deleteProduct(id: string) {
  try {
    // Check if user is admin
    const isAdmin = await isCurrentUserAdmin();
    if (!isAdmin) {
      return {
        success: false,
        error: "Unauthorized: Only admins can delete products",
      };
    }

    // Check if the product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return { success: false, error: "Product not found" };
    }

    // Delete the product from the database
    await prisma.product.delete({
      where: { id },
    });

    // Revalidate the products page to remove the deleted product
    revalidatePath("/admin/product");

    return { success: true };
  } catch (error) {
    console.error(`Failed to delete product ${id}:`, error);
    return { success: false, error: "Failed to delete product" };
  }
}

// Get all products
export async function getProducts() {
  try {
    // Check if user is admin
    const isAdmin = await isCurrentUserAdmin();

    // Get all products (for admin) or only active products (for non-admin)
    const products = await prisma.product.findMany({
      where: isAdmin ? {} : { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, products };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}

// Get a single product by ID
export async function getProductById(id: string) {
  try {
    // Check if user is admin
    const isAdmin = await isCurrentUserAdmin();

    // Get the product
    const product = await prisma.product.findFirst({
      where: {
        id,
        ...(isAdmin ? {} : { isActive: true }), // Only admins can see inactive products
      },
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    return { success: true, product };
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return { success: false, error: "Failed to fetch product" };
  }
}
