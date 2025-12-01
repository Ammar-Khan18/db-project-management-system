import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

interface Params {
  params: { id: string };
}

export async function GET() {
  const [rows] = await db.query("SELECT * FROM Lease_Agreements");
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { property_id, tenant_id, agent_id, start_date, end_date, monthly_rent, security_deposit, lease_status, payment_due_date, terms_conditions } = body;
  await db.query(
    `INSERT INTO Lease_Agreements (property_id, tenant_id, agent_id, start_date, end_date, monthly_rent, security_deposit, lease_status, payment_due_date, terms_conditions)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [property_id, tenant_id, agent_id || null, start_date, end_date, monthly_rent, security_deposit || null, lease_status || "Active", payment_due_date || 1, terms_conditions || null]
  );
  return NextResponse.json({ success: true });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, property_id, tenant_id, agent_id, start_date, end_date, monthly_rent, security_deposit, lease_status, payment_due_date, terms_conditions } = body;
  await db.query(
    `UPDATE Lease_Agreements SET property_id=?, tenant_id=?, agent_id=?, start_date=?, end_date=?, monthly_rent=?, security_deposit=?, lease_status=?, payment_due_date=?, terms_conditions=? WHERE id=?`,
    [property_id, tenant_id, agent_id || null, start_date, end_date, monthly_rent, security_deposit || null, lease_status || "Active", payment_due_date || 1, terms_conditions || null, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = params;
  await db.query("DELETE FROM Lease_Agreements WHERE id=?", [id]);
  return NextResponse.json({ success: true });
}
