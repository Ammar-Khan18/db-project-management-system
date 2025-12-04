"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Guest"); // default role
  const [msg, setMsg] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, role }),
    });

    const data = await res.json();

    if (data.success) {
      // Redirect to login page after successful registration
      router.push("/login");
    } else {
      setMsg(data.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 p-6 border rounded w-80"
      >
        <h1 className="text-2xl font-bold">Register</h1>

        <input
          type="text"
          placeholder="Username"
          className="border p-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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

        <select
          className="border p-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Admin" className="text-black">Admin</option>
          <option value="Owner" className="text-black">Owner</option>
          <option value="User" className="text-black">User</option>
          <option value="Guest" className="text-black">Guest</option>
        </select>

        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Register
        </button>

        {msg && <p>{msg}</p>}
      </form>
    </main>
  );
}
