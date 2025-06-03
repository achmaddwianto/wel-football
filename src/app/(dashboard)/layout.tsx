import { auth } from "@/auth";
import SideMenuServer from "@/components/server/SideMenu/SideMenuWrapper";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("./login");
  }

  return (
    <div className="flex">
      <SideMenuServer />
      {children}
    </div>
  );
}
