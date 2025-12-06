// /api/login/route.ts
import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const [rows] = await db.query("SELECT * FROM users WHERE email=? AND password=?", [email, password]);
  const user = (rows as any[])[0];

  if (!user) {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      owner_id: user.owner_id, // send this
    },
  });
}
