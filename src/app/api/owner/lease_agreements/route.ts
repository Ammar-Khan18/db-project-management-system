import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

// GET
export async function GET(req: NextRequest) {
  const owner_id = req.headers.get("owner_id");

  const rows = await db.query(`
    SELECT Lease_Agreements.*
    FROM Lease_Agreements
    JOIN Properties ON Properties.id = Lease_Agreements.property_id
    WHERE Properties.owner_id=?
  `, [owner_id]);

  return NextResponse.json(rows);
}

// POST
export async function POST(req: NextRequest) {
  const body = await req.json();

  await db.query(
    `INSERT INTO Lease_Agreements 
     (property_id, tenant_id, start_date, end_date, rent_amount)
     VALUES (?, ?, ?, ?, ?)`,
    [body.property_id, body.tenant_id, body.start_date, body.end_date, body.rent_amount]
  );

  return NextResponse.json({ success: true });
}

// PUT
export async function PUT(req: NextRequest) {
  const body = await req.json();

  await db.query(
    `UPDATE Lease_Agreements 
     SET property_id=?, tenant_id=?, start_date=?, end_date=?, rent_amount=?
     WHERE id=?`,
    [body.property_id, body.tenant_id, body.start_date, body.end_date, body.rent_amount, body.id]
  );

  return NextResponse.json({ success: true });
}

// DELETE
export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  await db.query("DELETE FROM Lease_Agreements WHERE id=?", [id]);
  return NextResponse.json({ success: true });
}
