import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function POST(req: NextRequest) {
  const { username, email, password, role } = await req.json();

  if (!username || !email || !password || !role) {
    return NextResponse.json({ success: false, message: "All fields required" });
  }

  // Check if email exists
  const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if ((existing as any[]).length > 0) {
    return NextResponse.json({ success: false, message: "Email already exists" });
  }

  // Insert into users table
  const [result] = await db.query("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)", [username, email, password, role]);

  let ownerId = null;

  // If role is Owner, also insert into Property_Owners
  if (role === "Owner") {
    const [ownerResult] = await db.query(
      "INSERT INTO Property_Owners (name, email) VALUES (?, ?)",
      [username, email]
    );
    ownerId = (ownerResult as any).insertId;

    // Optional: update users table with owner_id if you have that column
    await db.query("UPDATE users SET owner_id=? WHERE id=?", [ownerId, (result as any).insertId]);
  }

  return NextResponse.json({ success: true, message: "Registered successfully", ownerId });
}
