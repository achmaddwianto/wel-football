import type React from "react";
import { auth } from "@/auth";
import CustomersSideMenuWrapper from "@/components/server/CustomersSideMenu/CustomersSideMenuWrapper";
import { redirect } from "next/navigation";

export default async function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "user") {
    redirect("/login?callbackUrl=/dashboard");
  }
  return (
    <div className="flex min-h-screen pt-16">
      <CustomersSideMenuWrapper />
      <main className=" main flex-1 p-4">{children}</main>
    </div>
  );
}
