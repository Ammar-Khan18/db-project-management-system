"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-300 to-blue-500 px-4">

      {/* MAIN TITLE */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Property Management System
      </h1>

      {/* CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6">

        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Welcome
        </h2>

        <Link
          href="/login"
          className="block text-center w-full py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="block text-center w-full py-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition"
        >
          Register
        </Link>
        
      </div>

    </main>
  );
}
