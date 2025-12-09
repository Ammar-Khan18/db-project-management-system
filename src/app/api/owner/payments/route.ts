import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

// GET PAYMENTS
export async function GET(req: NextRequest) {
  try {
    const owner_id = req.nextUrl.searchParams.get("owner_id");
    const [rows] = await db.query("SELECT * FROM payment WHERE owner_id=?", [owner_id]);
    return NextResponse.json({ success: true, data: rows });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// CREATE PAYMENT
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const sql = `
      INSERT INTO payment
      (owner_id, tenant_id, amount, payment_type, payment_status, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const vals = [
      body.owner_id, body.tenant_id, body.amount,
      body.payment_type, body.payment_status, body.description
    ];

    const [result]: any = await db.query(sql, vals);
    return NextResponse.json({ success: true, id: result.insertId });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// UPDATE PAYMENT
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const sql = `
      UPDATE payment SET
      tenant_id=?, amount=?, payment_type=?, payment_status=?, description=?
      WHERE id=? AND owner_id=?
    `;

    const vals = [
      body.tenant_id, body.amount, body.payment_type,
      body.payment_status, body.description, body.id, body.owner_id
    ];

    await db.query(sql, vals);
    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// DELETE PAYMENT
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await db.query("DELETE FROM payment WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
