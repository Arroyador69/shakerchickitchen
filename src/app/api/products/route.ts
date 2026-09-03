import { NextResponse } from "next/server";
import { products } from "@/lib/products";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    source: "catalog-db",
    count: products.length,
    products,
  });
}
