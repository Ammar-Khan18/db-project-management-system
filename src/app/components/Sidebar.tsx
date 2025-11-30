// app/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { useUser } from "@/app/context/UserContext";

export default function Sidebar() {
  const { currentUser, setCurrentUser } = useUser();

  return (
    <div className="flex flex-col gap-4 text-black">
      <h1 className="text-2xl font-bold">PMS Dashboard</h1>

      <label className="text-sm font-medium">Logged in as:</label>
      <select
        value={currentUser}
        onChange={(e) => setCurrentUser(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="guest">Guest</option>
        <option value="admin">Admin</option>
      </select>

      <nav className="flex flex-col gap-2">
        <Link href="/properties" className="px-3 py-2 rounded hover:bg-gray-100">🏠 Properties</Link>
        <Link href="/tenants" className="px-3 py-2 rounded hover:bg-gray-100">👨‍👩‍👧 Tenants</Link>
        <Link href="/payments" className="px-3 py-2 rounded hover:bg-gray-100">💳 Payments</Link>
        <Link href="/lease-agreements" className="px-3 py-2 rounded hover:bg-gray-100">📄 Lease Agreements</Link>
        <Link href="/agents" className="px-3 py-2 rounded hover:bg-gray-100">🧑‍💼 Agents</Link>
        <Link href="/property-owners" className="px-3 py-2 rounded hover:bg-gray-100">🏢 Property Owners</Link>
      </nav>
    </div>
  );
}
