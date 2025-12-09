import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

// GET ALL PROPERTIES
export async function GET(req: NextRequest) {
  try {
    const owner_id = req.nextUrl.searchParams.get("owner_id");
    if (!owner_id)
      return NextResponse.json({ success: false, message: "owner_id required" });

    const [rows] = await db.query("SELECT * FROM properties WHERE owner_id = ?", [owner_id]);
    return NextResponse.json({ success: true, data: rows });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// CREATE PROPERTY
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sql = `
      INSERT INTO properties 
      (owner_id, agent_id, property_type, address, city, size_sqft, rooms, monthly_rent, security_deposit, description, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const vals = [
      body.owner_id, body.agent_id, body.property_type, body.address,
      body.city, body.size_sqft, body.rooms, body.monthly_rent,
      body.security_deposit, body.description, body.status
    ];

    const [result]: any = await db.query(sql, vals);
    return NextResponse.json({ success: true, id: result.insertId });
    
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// UPDATE PROPERTY
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const sql = `
      UPDATE properties SET 
      agent_id=?, property_type=?, address=?, city=?, size_sqft=?, rooms=?, 
      monthly_rent=?, security_deposit=?, description=?, status=?
      WHERE id=? AND owner_id=?
    `;

    const vals = [
      body.agent_id, body.property_type, body.address, body.city,
      body.size_sqft, body.rooms, body.monthly_rent, body.security_deposit,
      body.description, body.status, body.id, body.owner_id
    ];

    await db.query(sql, vals);

    return NextResponse.json({ success: true, message: "Updated" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}

// DELETE PROPERTY
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    await db.query("DELETE FROM properties WHERE id=?", [id]);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
