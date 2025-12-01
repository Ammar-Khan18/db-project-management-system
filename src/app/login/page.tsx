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

    if (data.success && data.user) {
      // Redirect based on role
      switch (data.user.role) {
        case "Admin":
          router.push("/admin/dashboard");
          break;
        case "Owner":
          router.push("/owner/dashboard");
          break;
        case "User":
          router.push("/user/dashboard");
          break;
        case "Guest":
        default:
          router.push("/guest/dashboard");
          break;
      }
    } else {
      setMsg(data.message || "Invalid login");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-6 border rounded w-80"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Login
        </button>

        {msg && <p>{msg}</p>}
      </form>
    </main>
  );
}
