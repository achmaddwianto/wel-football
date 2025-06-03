import { auth } from "@/auth";
import AdminSideMenu from "@/components/client/admin/AdminSideMenu/AdminSideMenu";

export default async function AdminSideMenuWrapper() {
  const session = await auth();

  if (!session || session?.user.role !== "admin") {
    return null;
  }

  return <AdminSideMenu user={session.user} />;
}
