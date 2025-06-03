"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type DataPoint = {
  date: string;
  total: number;
};

export default function SalesChart() {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch("/api/dashboard/sales")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow border">
      <h2 className="text-lg font-semibold mb-4">
        Grafik Penjualan (30 Hari Terakhir)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, bottom: 40, left: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date">
            <Label value="Tanggal" offset={-25} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[0, "auto"]}
            tickFormatter={(value) =>
              new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(value)
            }
          >
            <Label
              value="Total Penjualan (Rp)"
              angle={-90}
              position="insideLeft"
              offset={-15}
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip
            formatter={(value) => `Rp ${Number(value).toLocaleString("id-ID")}`}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#f97316"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
