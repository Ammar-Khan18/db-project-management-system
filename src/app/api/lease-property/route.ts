import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { property_id, duration_months = 12 } = body;

    const cookie = req.cookies.get("user_session")?.value;
    if (!cookie) {
      return NextResponse.json(
        { success: false, message: "Not logged in" },
        { status: 401 }
      );
    }

    const user = JSON.parse(cookie);
    const user_id = user.id;

    // IMPORTANT: Cast result to any[]
    const [rows]: any = await db.query(
      "CALL LeasePropertySafe(?, ?, ?)",
      [user_id, property_id, duration_months]
    );

    const lease_id = rows[0][0].lease_id;

    return NextResponse.json({
      success: true,
      message: "Property leased successfully",
      lease_id,
    });

  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
