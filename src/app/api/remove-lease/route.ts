import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { lease_id } = await req.json();

    // Get tenant_id from session cookie
    const cookie = req.cookies.get("user_session")?.value;
    if (!cookie)
      return NextResponse.json({ success: false, message: "Not logged in" }, { status: 401 });

    const user = JSON.parse(cookie);
    const user_id = user.id;

    // Fetch tenant_id for logged-in user
    const [tenantRows] = await db.query(
      `SELECT id AS tenant_id FROM Tenants WHERE user_id = ? LIMIT 1`,
      [user_id]
    );

    if (!tenantRows || tenantRows.length === 0)
      return NextResponse.json({ success: false, message: "Tenant not found" });

    const tenant_id = tenantRows[0].tenant_id;

    // Call procedure with exactly 2 arguments
    const [resultSets] = await db.query(`CALL RemoveLeaseSafe(?, ?)`, [lease_id, tenant_id]);

    // Procedure returns a message as a result set
    const message = resultSets?.[0]?.[0]?.message || "Lease removed successfully";

    return NextResponse.json({ success: true, message });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message });
  }
}
