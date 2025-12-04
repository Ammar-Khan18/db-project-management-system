"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Guest");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const payload: any = { username, email, password, role };

    if (role === "Owner") {
      payload.cnic = cnic;
      payload.phone_no = phone;
      payload.address = address;
      payload.city = city;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/login");
    } else {
      setMsg(data.message);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-blue-500 px-4">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 drop-shadow">
        Create Your Account
      </h1>

      {/* REGISTRATION CARD */}
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 p-8 bg-white rounded-2xl shadow-lg w-full max-w-sm text-black"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Register
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Admin" className="text-black">Admin</option>
          <option value="Owner" className="text-black">Owner</option>
          <option value="User" className="text-black">User</option>
          <option value="Guest" className="text-black">Guest</option>
        </select>

        {/* Owner-specific fields */}
        {role === "Owner" && (
          <>
            <input
              type="text"
              placeholder="CNIC"
              className="border p-2 rounded"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border p-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-2 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="City"
              className="border p-2 rounded"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Register
        </button>

        {msg && <p className="text-red-600 text-sm text-center">{msg}</p>}
      </form>

      {/* ROLE INFORMATION BOX */}
      <div className="mt-6 bg-yellow-200 border border-yellow-400 text-yellow-900 p-4 rounded-lg shadow-md max-w-md">
        <h3 className="font-bold mb-2">🔎 What Each Role Does</h3>
        <ul className="list-disc ml-5 text-sm space-y-1">
          <li>
            <strong>Admin:</strong> Full control — manage users, properties, agents, tenants, leases, and payments.
          </li>
          <li>
            <strong>Owner:</strong> Can view and manage their own properties and tenants.
          </li>
          <li>
            <strong>User:</strong> Regular user — limited viewing access.
          </li>
          <li>
            <strong>Guest:</strong> Minimal access, read-only.
          </li>
        </ul>
      </div>

    </main>
  );
}
