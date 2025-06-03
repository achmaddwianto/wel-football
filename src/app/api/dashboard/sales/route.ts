import { NextResponse } from "next/server";
import { getDailySalesData } from "@/lib/actions";

export async function GET() {
  const data = await getDailySalesData();
  return NextResponse.json(data);
}
