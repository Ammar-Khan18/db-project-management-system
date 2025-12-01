import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function GET() {
  const [rows] = await db.query("SELECT * FROM Tenants");
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, cnic, phone_no, email, occupation } = body;
  await db.query(
    "INSERT INTO Tenants (name, cnic, phone_no, email, occupation) VALUES (?, ?, ?, ?, ?)",
    [name, cnic, phone_no, email || null, occupation || null]
  );
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (!body.id) return NextResponse.json({ success: false, message: "ID missing" }, { status: 400 });
  const { id, name, cnic, phone_no, email, occupation, is_active } = body;
  await db.query(
    "UPDATE Tenants SET name=?, cnic=?, phone_no=?, email=?, occupation=?, is_active=? WHERE id=?",
    [name, cnic, phone_no, email || null, occupation || null, is_active || "Y", id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ success: false, message: "ID missing" }, { status: 400 });
  await db.query("DELETE FROM Tenants WHERE id=?", [id]);
  return NextResponse.json({ success: true });
}
