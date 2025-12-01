import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";

export async function GET() {
  // Fetch all agents
  const [rows] = await pool.query<any[]>("SELECT * FROM agents");
  return NextResponse.json(rows);

}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, cnic, phone_no, address, city, email, commision_rate } = body;

  // Insert new agent into database
  await pool.query(
    "INSERT INTO agents (name, cnic, phone_no, address, city, email, commision_rate) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, cnic, phone_no, address, city, email, commision_rate]
  );

  return NextResponse.json({ message: "Agent added successfully" });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;

  // Delete agent by id
  await pool.query("DELETE FROM agents WHERE id = ?", [id]);

  return NextResponse.json({ message: "Agent deleted successfully" });
}
