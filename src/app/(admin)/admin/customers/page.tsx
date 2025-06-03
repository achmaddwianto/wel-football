import TableCustomer from "@/components/client/admin/TableCustomer/TableCustomer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pelanggan",
};
const CustomersPage = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-screen-md mx-auto py-10">
        <h1 className="text-2xl font-bold">Pelanggan</h1>
        <TableCustomer />
      </div>
    </div>
  );
};

export default CustomersPage;
