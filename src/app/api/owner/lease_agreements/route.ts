import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

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

    const [rows] = await db.query(
      "SELECT * FROM Lease_Agreements WHERE owner_id = ?",
      [owner_id]
    );

    return NextResponse.json({
      success: true,
      data: rows || [],
      message: "Lease Agreements fetched successfully",
    });
  } catch (err: any) {
    console.error("Lease Agreements API error:", err);
    return NextResponse.json({
      success: false,
      data: [],
      message: err.message || "Server error",
    }, { status: 500 });
  }
}
