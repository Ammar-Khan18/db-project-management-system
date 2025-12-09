// src/app/api/my-leases/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function GET(req: NextRequest) {
  try {
    const cookie = req.cookies.get("user_session")?.value;
    if (!cookie) return NextResponse.json({ success: false, message: "Not logged in" }, { status: 401 });

    const user = JSON.parse(cookie);
    const user_id = user.id;

    // find tenant id(s) for this user
    const [tenantRows]: any = await db.query("SELECT id FROM Tenants WHERE user_id = ?", [user_id]);
    const tenantIds = Array.isArray(tenantRows) ? tenantRows.map((r: any) => r.id) : [];

    if (tenantIds.length === 0) {
      return NextResponse.json({ success: true, data: [] });
    }

    // fetch leases with property info
    const [rows]: any = await db.query(
      `SELECT la.*, p.address AS property_address, p.city AS property_city, p.property_type
       FROM Lease_Agreements la
       JOIN Properties p ON la.property_id = p.id
       WHERE la.tenant_id IN (?)
       ORDER BY la.created_date DESC`,
      [tenantIds]
    );

    return NextResponse.json({ success: true, data: rows || [] });
  } catch (err: any) {
    console.error("My leases API error:", err);
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 });
  }
}
