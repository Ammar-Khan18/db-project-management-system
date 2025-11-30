// app/api/owners/route.ts
import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

export async function GET() {
  const [rows] = await pool.query("SELECT id, name FROM Property_Owners");
  return NextResponse.json(rows);
}
