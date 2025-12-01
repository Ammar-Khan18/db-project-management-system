import { NextResponse } from "next/server";
import db from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    const { username, email, password, role } = await req.json();

    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, password, role]
    );

    return NextResponse.json({ success: true, message: "User registered" });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
