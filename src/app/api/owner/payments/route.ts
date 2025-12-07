// app/api/owner/payments/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db"; // adjust path

export async function GET(req: NextRequest) {
  try {
    const owner_id = req.nextUrl.searchParams.get("owner_id");
    if (!owner_id) {
      return NextResponse.json({
        success: false,
        data: [],
        message: "owner_id query param missing",
      }, { status: 400 });
    }

    const [rows] = await db.query("SELECT * FROM Payment WHERE owner_id = ?", [owner_id]);

    return NextResponse.json({
      success: true,
      data: rows || [],
      message: "Payments fetched successfully",
    });
  } catch (err: any) {
    console.error("Payments API error:", err);
    return NextResponse.json({
      success: false,
      data: [],
      message: err.message || "Server error",
    }, { status: 500 });
  }
}
