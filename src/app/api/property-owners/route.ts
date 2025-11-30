import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

export async function GET() {
  const [rows] = await pool.query<any[]>("SELECT * FROM property_owners");
  return NextResponse.json({ owners: rows });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, cnic, phone_no, email, address, city } = body;

  await pool.query(
    "INSERT INTO property_owners (name, cnic, phone_no, email, address, city) VALUES (?, ?, ?, ?, ?, ?)",
    [name, cnic, phone_no, email, address, city]
  );

  return NextResponse.json({ message: "Property owner added successfully" });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  await pool.query("DELETE FROM property_owners WHERE id = ?", [id]);

  return NextResponse.json({ message: "Property owner deleted successfully" });
}
