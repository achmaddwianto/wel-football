"use client";

import { ReactNode } from "react";

type Stats = {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  orderStatus: {
    pending: number;
    shipped: number;
    completed: number;
  };
};

export default function OverviewCards({ data }: { data: Stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card title="Produk Aktif" value={data.totalProducts} />
      <Card title="Pesanan" value={data.totalOrders} />
      <Card
        title="Pendapatan"
        value={`Rp ${data.totalRevenue.toLocaleString()}`}
      />
      <Card
        title="Status Pesanan"
        value={
          <>
            <p>Pending: {data.orderStatus.pending}</p>
            <p>Dikirim: {data.orderStatus.shipped}</p>
            <p>Selesai: {data.orderStatus.completed}</p>
          </>
        }
      />
    </div>
  );
}

function Card({ title, value }: { title: string; value: ReactNode }) {
  return (
    <div className="p-4 bg-white border rounded shadow">
      <h2 className=" font-medium text-gray-500 mb-2">{title}</h2>
      <div className="flex gap-3 text-md font-semibold">{value}</div>
    </div>
  );
}
