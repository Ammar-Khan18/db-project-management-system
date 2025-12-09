import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

// GET TENANTS BY OWNER
export async function GET(req: NextRequest) {
  try {
    const owner_id = req.nextUrl.searchParams.get("owner_id");
    const [rows] = await db.query("SELECT * FROM tenants WHERE owner_id=?", [owner_id]);
    return NextResponse.json({ success: true, data: rows });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// CREATE TENANT
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const sql = `INSERT INTO tenants (owner_id, name, cnic, phone_no, email, occupation)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    const vals = [
      body.owner_id, body.name, body.cnic,
      body.phone_no, body.email, body.occupation
    ];

    const [result]: any = await db.query(sql, vals);
    return NextResponse.json({ success: true, id: result.insertId });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// UPDATE TENANT
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const sql = `
      UPDATE tenants SET 
      name=?, cnic=?, phone_no=?, email=?, occupation=?
      WHERE id=? AND owner_id=?
    `;

    const vals = [
      body.name, body.cnic, body.phone_no,
      body.email, body.occupation, body.id, body.owner_id
    ];

    await db.query(sql, vals);
    return NextResponse.json({ success: true });

  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// DELETE TENANT
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await db.query("DELETE FROM tenants WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
