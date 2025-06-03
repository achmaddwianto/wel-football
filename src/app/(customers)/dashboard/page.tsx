import { auth } from "@/auth";

export default async function CustomerDashboardPage() {
  const session = await auth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Customer</h1>
      <p>Selamat datang, {session?.user?.name || session?.user?.email}!</p>

      {/* Konten dashboard customer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Pesanan Aktif</h2>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Wishlist</h2>
          <p className="text-3xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
}
