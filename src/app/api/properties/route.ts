// app/api/properties/route.ts
import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

export async function GET() {
  const [rows] = await pool.query("SELECT * FROM Properties");
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    owner_id, agent_id, property_type, address, city,
    size_sqft, rooms, monthly_rent, security_deposit, description
  } = body;

  const [result] = await pool.query(
    `INSERT INTO Properties (owner_id, agent_id, property_type, address, city, size_sqft, rooms, monthly_rent, security_deposit, description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      owner_id,
      agent_id ?? null,
      property_type,
      address,
      city,
      size_sqft ?? null,
      rooms ?? null,
      monthly_rent ?? null,
      security_deposit ?? null,
      description ?? null,
    ]
  );

  return NextResponse.json({ ok: true, id: (result as any).insertId });
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

  await pool.query("DELETE FROM Properties WHERE id = ?", [id]);
  return NextResponse.json({ ok: true });
}
