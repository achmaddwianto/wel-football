import { auth } from "@/auth";
import DateFilter from "@/components/client/admin/DateFilter/DateFilter";
import OverviewCards from "@/components/client/admin/OverviewCards/OverviewCards";
import SalesChart from "@/components/client/admin/SalesChart/SalesChart";
import { getDashboardStats } from "@/lib/actions";

export default async function AdminDashboardPage() {
  const session = await auth();
  const stats = await getDashboardStats();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <p>Welcome, {session?.user?.name || session?.user?.email}!</p>

      {/* Konten dashboard admin */}
      <DateFilter />
      <OverviewCards data={stats} />

      <div className="mt-6">
        <SalesChart />
      </div>
    </div>
  );
}
