// app/api/owner/tenants/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const owner_id = req.nextUrl.searchParams.get("owner_id");

    if (!owner_id) {
      // Always return JSON, even for missing params
      return NextResponse.json({
        success: false,
        data: [],
        message: "owner_id query param missing",
      }, { status: 400 });
    }

    // Fetch tenants for the owner
    const [rows] = await db.query("SELECT * FROM tenants WHERE owner_id = ?", [owner_id]);

    // Ensure rows is always an array
    const tenants = Array.isArray(rows) ? rows : [];

    return NextResponse.json({
      success: true,
      data: tenants,
      message: "Tenants fetched successfully",
    });

  } catch (err: any) {
    console.error("Tenants API error:", err);

    return NextResponse.json({
      success: false,
      data: [],
      message: err.message || "Server error",
    }, { status: 500 });
  }
}
