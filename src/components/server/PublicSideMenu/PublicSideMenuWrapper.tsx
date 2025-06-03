import { auth } from "@/auth";
import PublicSideMenu from "@/components/client/PublicSideMenu/PublicSideMenu";

export default async function PublicSideMenuWrapper() {
  const session = await auth();

  if (!session || session?.user.role !== "admin") {
    return null;
  }

  return <PublicSideMenu user={session.user} />;
}
