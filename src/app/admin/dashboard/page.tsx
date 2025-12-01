"use client";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6">You can view and manage all tables here.</p>

      <div className="grid grid-cols-2 gap-4">
        <button className="bg-red-600 text-white p-3 rounded">Manage Owners</button>
        <button className="bg-blue-600 text-white p-3 rounded">Manage Agents</button>
        <button className="bg-green-600 text-white p-3 rounded">Manage Properties</button>
        <button className="bg-yellow-500 text-white p-3 rounded">Manage Tenants</button>
      </div>
    </main>
  );
}
