import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

// GET properties for owner
export async function GET(req: NextRequest) {
  const owner_id = req.headers.get("owner_id");

  const rows = await db.query("SELECT * FROM Properties WHERE owner_id=?", [owner_id]);
  return NextResponse.json(rows);
}

// CREATE property
export async function POST(req: NextRequest) {
  const owner_id = req.headers.get("owner_id");
  const body = await req.json();

  await db.query(
    `INSERT INTO Properties 
    (owner_id, title, address, city, rent_price, status)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [owner_id, body.title, body.address, body.city, body.rent_price, body.status]
  );

  return NextResponse.json({ success: true });
}

// UPDATE property
export async function PUT(req: NextRequest) {
  const body = await req.json();

  await db.query(
    `UPDATE Properties SET title=?, address=?, city=?, rent_price=?, status=? WHERE id=?`,
    [body.title, body.address, body.city, body.rent_price, body.status, body.id]
  );

  return NextResponse.json({ success: true });
}

// DELETE property
export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");

  await db.query("DELETE FROM Properties WHERE id=?", [id]);
  return NextResponse.json({ success: true });
}
