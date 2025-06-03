import type React from "react";
import { auth } from "@/auth";
import AdminSideMenuWrapper from "@/components/server/AdminSideMenu/AdminSideMenuWrapper";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  //Redirect jika belum login atau bukan admin
  if (!session || session.user.role !== "admin") {
    redirect("/login?callbackUrl=/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen pt-16">
      <AdminSideMenuWrapper />
      <main className="main flex-1 p-4">{children}</main>
    </div>
  );
}
