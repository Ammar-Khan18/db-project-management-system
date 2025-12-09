import { NextResponse } from "next/server";
import db from "../../../../../lib/db";

export async function GET() {
  try {
    // Destructure the first element as rows
const [rows] = await db.query(`
  SELECT 
    id,
    owner_id,
    agent_id,
    property_type,
    address,
    city,
    size_sqft,
    rooms,
    monthly_rent,
    security_deposit,
    listing_date,
    status,
    description,
    image_url        -- ADD THIS
  FROM Properties
  WHERE status = 'Available'
`);


    // Type assertion to let TS know rows is an array
    const properties = rows as any[];

    // Map DB fields into UI-friendly structure
const formatted = properties.map((p) => ({
  id: p.id,
  owner_id: p.owner_id,
  property_type: p.property_type,
  title: `${p.property_type} in ${p.city}`,
  location: `${p.address}, ${p.city}`,
  rent_amount: p.monthly_rent,
  rooms: p.rooms,
  size_sqft: p.size_sqft,
  description: p.description,
  status: p.status,
  image_url: p.image_url   // ADD THIS
}));


    return NextResponse.json({
      success: true,
      data: formatted
    });

  } catch (err: any) {
    console.error("Public Properties API Error:", err);
    return NextResponse.json(
      { success: false, data: [], message: err.message || "Server error" },
      { status: 500 }
    );
  }
}
