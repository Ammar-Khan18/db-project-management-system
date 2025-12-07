// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../lib/db";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    const users = rows as any[];
    const user = users[0];
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }

    // Set HTTP-only cookie
    const cookie = serialize(
      "user_session",
      JSON.stringify({ id: user.id, email: user.email, role: user.role }),
      {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "strict",
      }
    );

    return NextResponse.json(
      { success: true, role: user.role },
      { headers: { "Set-Cookie": cookie } }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
