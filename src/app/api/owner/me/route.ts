// app/api/owner/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("user_session")?.value;
    if (!cookie) return NextResponse.json({ success: false, message: "Not logged in" }, { status: 401 });

    const user = JSON.parse(cookie);

    // Get owner_id from Property_Owners table
    const [rows] = await db.query(
      `SELECT p.id AS owner_id, p.name, p.email AS owner_email 
       FROM Property_Owners p
       JOIN users u ON u.owner_id = p.id
       WHERE u.id = ?`,
      [user.id]
    );

    const owners = rows as any[];
    if (owners.length === 0) return NextResponse.json({ success: false, message: "Owner not found" });

    return NextResponse.json({ success: true, owner: owners[0] });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
