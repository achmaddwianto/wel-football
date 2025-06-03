import { auth } from "@/auth";
import Header from "@/components/client/Header";

export default async function HeaderWrapper() {
  const session = await auth();

  return <Header user={session?.user} isLoggedIn={!!session} />;
}
