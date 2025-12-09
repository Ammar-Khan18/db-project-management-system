import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

// GET LEASE AGREEMENTS
export async function GET(req: NextRequest) {
  try {
    const owner_id = req.nextUrl.searchParams.get("owner_id");
    const [rows] = await db.query("SELECT * FROM lease_agreements WHERE owner_id=?", [owner_id]);

    return NextResponse.json({ success: true, data: rows });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// CREATE
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const sql = `
      INSERT INTO lease_agreements 
      (owner_id, property_id, tenant_id, agent_id, start_date, end_date, monthly_rent,
       security_deposit, lease_status, payment_due_date, terms_conditions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const vals = [
      body.owner_id, body.property_id, body.tenant_id,
      body.agent_id, body.start_date, body.end_date,
      body.monthly_rent, body.security_deposit, body.lease_status,
      body.payment_due_date, body.terms_conditions
    ];

    const [result]: any = await db.query(sql, vals);
    return NextResponse.json({ success: true, id: result.insertId });
    
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// UPDATE
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const sql = `
      UPDATE lease_agreements SET 
      property_id=?, tenant_id=?, agent_id=?, start_date=?, end_date=?,
      monthly_rent=?, security_deposit=?, lease_status=?, payment_due_date=?, terms_conditions=?
      WHERE id=? AND owner_id=?
    `;

    const vals = [
      body.property_id, body.tenant_id, body.agent_id,
      body.start_date, body.end_date, body.monthly_rent,
      body.security_deposit, body.lease_status, body.payment_due_date,
      body.terms_conditions, body.id, body.owner_id
    ];

    await db.query(sql, vals);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// DELETE
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await db.query("DELETE FROM lease_agreements WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
