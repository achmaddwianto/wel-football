import { auth } from "@/auth";
import TableProduct from "@/components/client/admin/Product/TableProduct/TableProduct";
import { AddProductButton } from "@/components/client/Button/Button";
import TableProductSkeleton from "@/components/shared/skeletons/TableProductSkeletons";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Produk",
};
const ProductPage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Produk</h1>
          <p>Kelola produk toko anda</p>
        </div>
        <AddProductButton />
      </div>

      <Suspense fallback={<TableProductSkeleton />}>
        <TableProduct />
      </Suspense>
    </div>
  );
};

export default ProductPage;
