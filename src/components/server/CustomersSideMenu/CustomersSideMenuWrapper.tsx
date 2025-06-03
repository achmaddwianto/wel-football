import { auth } from "@/auth";
import CustomerSideMenu from "@/components/client/customers/CustomersSideMenu/CustomersSideMenu";

export default async function CustomersSideMenuWrapper() {
  const session = await auth();

  if (!session || session?.user.role !== "user") {
    return null;
  }

  return <CustomerSideMenu user={session.user} />;
}
