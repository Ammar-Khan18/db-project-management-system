import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) return NextResponse.json({ success: false, message: "Email required" });

    // Join users with Property_Owners to get the actual owner_id
    const [rows] = await db.query(
      `SELECT 
          p.id AS owner_id, 
          p.name, 
          p.email AS owner_email, 
          u.id AS user_id, 
          u.role 
       FROM users u
       JOIN Property_Owners p ON u.owner_id = p.id
       WHERE u.email = ?`,
      [email]
    );

    const owners = rows as any[];
    if (owners.length === 0) return NextResponse.json({ success: false, message: "Owner not found" });

    return NextResponse.json({ success: true, owner: owners[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}
