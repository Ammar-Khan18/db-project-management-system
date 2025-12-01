import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

// GET all properties
export async function GET() {
  const [rows] = await db.query("SELECT * FROM Properties");
  return NextResponse.json(rows);
}

// POST new property
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { owner_id, agent_id, property_type, address, city, size_sqft, rooms, monthly_rent, security_deposit, status, description } = body;
  await db.query(
    `INSERT INTO Properties (owner_id, agent_id, property_type, address, city, size_sqft, rooms, monthly_rent, security_deposit, status, description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [owner_id, agent_id || null, property_type, address, city, size_sqft, rooms || null, monthly_rent, security_deposit || null, status || "Available", description || null]
  );
  return NextResponse.json({ success: true });
}

// PUT: update property
export async function PUT(req: NextRequest) {
  const body = await req.json();
  if (!body.id) return NextResponse.json({ success: false, message: "ID missing" }, { status: 400 });
  const { id, owner_id, agent_id, property_type, address, city, size_sqft, rooms, monthly_rent, security_deposit, status, description } = body;
  await db.query(
    `UPDATE Properties SET owner_id=?, agent_id=?, property_type=?, address=?, city=?, size_sqft=?, rooms=?, monthly_rent=?, security_deposit=?, status=?, description=? WHERE id=?`,
    [owner_id, agent_id || null, property_type, address, city, size_sqft, rooms || null, monthly_rent, security_deposit || null, status || "Available", description || null, id]
  );
  return NextResponse.json({ success: true });
}

// DELETE property
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ success: false, message: "ID missing" }, { status: 400 });
  await db.query("DELETE FROM Properties WHERE id=?", [id]);
  return NextResponse.json({ success: true });
}
