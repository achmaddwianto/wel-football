"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function DateFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const search = new URLSearchParams(params.toString());
    search.set(name, value);
    router.push(`/admin/dashboard?${search.toString()}`);
  };

  return (
    <div className="flex gap-4 my-6">
      <select
        name="month"
        className="border p-2 rounded"
        onChange={handleChange}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>{`Bulan ${i + i}`}</option>
        ))}
      </select>

      <select
        name="year"
        className="border p-2 rounded"
        onChange={handleChange}
      >
        {[2023, 2024, 2025].map((year) => (
          <option key={year} value={year}>{`Tahun ${year}`}</option>
        ))}
      </select>
    </div>
  );
}
