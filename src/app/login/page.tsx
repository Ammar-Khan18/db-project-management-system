"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      switch (data.role) {
        case "Owner":
          router.push("/owner/dashboard");
          break;
        case "Admin":
          router.push("/admin/dashboard");
          break;

        // 🔥 CHANGED THIS:
        case "User":
          router.push("/browse-properties"); // <--- redirect users to browse properties
          break;

        default:
          router.push("/guest/dashboard");
          break;
      }
    } else {
      setMsg(data.message || "Invalid login");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-blue-500 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 drop-shadow">Welcome Back</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8 bg-white rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
        <input type="email" placeholder="Email" className="border p-2 rounded text-black" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="border p-2 rounded text-black" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg font-medium hover:bg-blue-700 transition">Login</button>
        <p className="mt-4 text-black text-sm">
  Don’t have an account?{" "}
  <span
    onClick={() => router.push("/register")}
    className="text-blue-600 font-medium hover:underline"
  >
    Create one here
  </span>
</p>

        {msg && <p className="text-red-600 text-sm text-center">{msg}</p>}
      </form>
    </main>
  );
}
