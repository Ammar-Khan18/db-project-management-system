import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

// GET payments for owner's properties
export async function GET(req: NextRequest) {
  const owner_id = req.headers.get("owner_id");

  const rows = await db.query(`
    SELECT Payments.*
    FROM Payments
    JOIN Lease_Agreements ON Lease_Agreements.id = Payments.lease_id
    JOIN Properties ON Properties.id = Lease_Agreements.property_id
    WHERE Properties.owner_id=?
  `, [owner_id]);

  return NextResponse.json(rows);
}

// POST new payment
export async function POST(req: NextRequest) {
  const body = await req.json();

  await db.query(
    `INSERT INTO Payments (lease_id, amount, payment_date, method)
     VALUES (?, ?, ?, ?)`,
    [body.lease_id, body.amount, body.payment_date, body.method]
  );

  return NextResponse.json({ success: true });
}

// PUT update payment
export async function PUT(req: NextRequest) {
  const body = await req.json();

  await db.query(
    `UPDATE Payments SET lease_id=?, amount=?, payment_date=?, method=?
     WHERE id=?`,
    [body.lease_id, body.amount, body.payment_date, body.method, body.id]
  );

  return NextResponse.json({ success: true });
}

// DELETE
export async function DELETE(req: NextRequest) {
  const id = new URL(req.url).searchParams.get("id");
  await db.query("DELETE FROM Payments WHERE id=?", [id]);
  return NextResponse.json({ success: true });
}
