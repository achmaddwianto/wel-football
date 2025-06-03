import { auth } from "@/auth";
import SideMenu from "@/components/client/SideMenu/SideMenu";

export default async function SideMenuServer() {
  // Periksa status autentikasi di server
  const session = await auth();
  const isLoggedIn = !!session;

  // Hanya render SideMenu jika user sudah login
  if (!isLoggedIn) {
    return null; // Tidak menampilkan apa-apa jika belum login
  }

  // Teruskan data user ke client component jika diperlukan
  return <SideMenu user={session?.user} />;
}
