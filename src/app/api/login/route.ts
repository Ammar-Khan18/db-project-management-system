import { NextResponse } from "next/server";
import db from "../../../../lib/db";

interface UserRow {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  owner_id?: number | null;
  tenant_id?: number | null;
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Query returns type RowDataPacket[] | OkPacket
    const [rows] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

    // Cast rows safely to UserRow[]
    const users = rows as UserRow[];
    const user = users[0] || null;

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
