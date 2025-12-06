// alternative (no explicit transaction)
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password, role, cnic, phone_no, address, city } = body;

    if (!username || !email || !password || !role) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ success: false, message: "Email already exists" }, { status: 400 });
    }

    const [userResult] = await db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, password, role]
    );
    const userId = (userResult as any).insertId;
    let ownerId: number | null = null;

    if (role === "Owner") {
      if (!cnic || !phone_no || !address || !city) {
        return NextResponse.json({ success: false, message: "Owner details incomplete" }, { status: 400 });
      }

      const [ownerResult] = await db.query(
        `INSERT INTO Property_Owners (user_id, name, cnic, phone_no, email, address, city)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [userId, username, cnic, phone_no, email, address, city]
      );
      ownerId = (ownerResult as any).insertId;

      await db.query("UPDATE users SET owner_id = ? WHERE id = ?", [ownerId, userId]);
    }

    return NextResponse.json({ success: true, message: "Registered successfully", userId, ownerId });
  } catch (err: any) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json({ success: false, message: "Server error", error: err.message }, { status: 500 });
  }
}
