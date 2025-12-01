import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

interface Params {
  params: { id: string };
}

export async function GET() {
  const [rows] = await db.query("SELECT * FROM Payment");
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { tenant_id, amount, payment_type, payment_status, description } = body;
  await db.query(
    `INSERT INTO Payment (tenant_id, amount, payment_type, payment_status, description)
     VALUES (?, ?, ?, ?, ?)`,
    [tenant_id, amount, payment_type, payment_status || "Pending", description || null]
  );
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, tenant_id, amount, payment_type, payment_status, description } = body;
  await db.query(
    `UPDATE Payment SET tenant_id=?, amount=?, payment_type=?, payment_status=?, description=? WHERE id=?`,
    [tenant_id, amount, payment_type, payment_status || "Pending", description || null, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = params;
  await db.query("DELETE FROM Payment WHERE id=?", [id]);
  return NextResponse.json({ success: true });
}
