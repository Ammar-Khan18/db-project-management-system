import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

export async function GET() {
  const [rows] = await pool.query<any[]>("SELECT * FROM tenants");
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone_no, cnic, occupation } = body;

  await pool.query(
    "INSERT INTO tenants (name, email, phone_no, cnic, occupation) VALUES (?, ?, ?, ?, ?)",
    [name, email, phone_no, cnic, occupation]
  );

  return NextResponse.json({ message: "Tenant added" });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  await pool.query("DELETE FROM tenants WHERE id = ?", [id]);

  return NextResponse.json({ message: "Tenant deleted" });
}
