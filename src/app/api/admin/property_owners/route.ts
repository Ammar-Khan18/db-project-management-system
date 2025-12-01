import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

interface Owner {
  id?: number;
  name: string;
  cnic: string;
  phone_no: string;
  email?: string;
  address?: string;
  city: string;
  is_active?: "Y" | "N";
}

// GET all owners
export async function GET() {
  const [rows] = await db.query("SELECT * FROM Property_Owners");
  return NextResponse.json(rows);
}

// POST: Add new owner
export async function POST(req: NextRequest) {
  const body: Owner = await req.json();

  const { name, cnic, phone_no, email, address, city } = body;

  const [result] = await db.query(
    "INSERT INTO Property_Owners (name, cnic, phone_no, email, address, city) VALUES (?, ?, ?, ?, ?, ?)",
    [name, cnic, phone_no, email || null, address || null, city]
  );

  return NextResponse.json({ success: true });
}

// PUT: Update existing owner
export async function PUT(req: NextRequest) {
  const body: Owner = await req.json();
  if (!body.id) return NextResponse.json({ success: false, message: "ID missing" }, { status: 400 });

  const { id, name, cnic, phone_no, email, address, city, is_active } = body;

  await db.query(
    "UPDATE Property_Owners SET name=?, cnic=?, phone_no=?, email=?, address=?, city=?, is_active=? WHERE id=?",
    [name, cnic, phone_no, email || null, address || null, city, is_active || "Y", id]
  );

  return NextResponse.json({ success: true });
}

// DELETE: Delete owner
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ success: false, message: "ID missing" }, { status: 400 });

  await db.query("DELETE FROM Property_Owners WHERE id=?", [id]);
  return NextResponse.json({ success: true });
}
