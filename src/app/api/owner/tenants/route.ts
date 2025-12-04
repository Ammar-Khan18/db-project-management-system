import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function GET(req: NextRequest) {
  const owner_id = req.headers.get("owner_id");

  const rows = await db.query(`
    SELECT Tenants.*
    FROM Tenants
    JOIN Lease_Agreements ON Lease_Agreements.tenant_id = Tenants.id
    JOIN Properties ON Properties.id = Lease_Agreements.property_id
    WHERE Properties.owner_id=?
  `, [owner_id]);

  return NextResponse.json(rows);
}
