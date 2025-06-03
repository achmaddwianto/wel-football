import { object, string, number, any, z } from "zod";

export const SignInSchema = object({
  email: string().email("Email tidak valid"),
  password: string()
    .min(8, "Password harus lebih dari 8 karakter")
    .max(32, "Password harus kurang dari 32 karakter"),
});

export const RegisterSchema = object({
  name: string().min(1, "Nama harus lebih dari 1 karakter"),
  email: string().email("Email tidak valid"),
  password: string()
    .min(8, "Password harus lebih dari 8 karakter")
    .max(32, "Password harus kurang dari 32 karakter"),
  ConfirmPassword: string()
    .min(8, "Password harus lebih dari 8 karakter")
    .max(32, "Password harus kurang dari 32 karakter"),
}).refine((data) => data.password === data.ConfirmPassword, {
  message: "Password tidak cocok",
  path: ["ConfirmPassword"],
});

// Add the Product Schema
export const ProductSchema = object({
  name: string().min(3, { message: "Nama harus minimal 3 karakter" }),
  price: number().positive({ message: "Harga harus positif" }),
  stock: number()
    .int()
    .nonnegative({ message: "Stok harus berupa angka non-negatif" }),
  description: string().min(10, {
    message: "Deskripsi harus minimal 10 karakter",
  }),
  category: string().min(1, { message: "Kategori harus diisi" }),
  image: any().optional(),
});

export type ProductFormData = z.infer<typeof ProductSchema>;
