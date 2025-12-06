// app/owner/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OwnerPropertyForm from "./components/OwnerPropertyForm";
import OwnerTableView, { TenantForm } from "./components/OwnerTableView";
import LeaseForm from "./components/LeaseForm";
import PaymentForm from "./components/PaymentForm";

type TableName = "Properties" | "Tenants" | "Lease_Agreements" | "Payments";

export default function OwnerDashboard() {
  const router = useRouter();
  const [table, setTable] = useState<TableName>("Properties");
  const [data, setData] = useState<any[]>([]);
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState<any>(null);

  // READ user from localStorage
  // useEffect(() => {
  //   const raw = localStorage.getItem("user");
  //   if (!raw) {
  //     router.push("/login");
  //     return;
  //   }
  //   const loggedUser = JSON.parse(raw);

  //   if (loggedUser.role !== "Owner") {
  //     router.push("/login");
  //     return;
  //   }

  //   setUser(loggedUser); // store user info for API calls
  // }, [router]);

  // Fetch data when table changes or user loads
  useEffect(() => {
    if (user) fetchData();
  }, [table, user]);

  async function fetchData() {
    const res = await fetch(`/api/owner/${table.toLowerCase()}?owner_id=${user.id}`);
    const json = await res.json();
    setData(json);
  }

  function handleEdit(row: any) {
    setEditingRow(row);
    setShowForm(true);
  }

  async function handleDelete(row: any) {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/owner/${table.toLowerCase()}/${row.id}`, { method: "DELETE" });
    fetchData();
  }

  function handleAdd() {
    setEditingRow(null);
    setShowForm(true);
  }

  function handleFormSuccess() {
    setShowForm(false);
    fetchData();
  }

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  function renderForm() {
    const common = { onSuccess: handleFormSuccess, onCancel: () => setShowForm(false) };
    switch (table) {
      case "Properties":
        return <OwnerPropertyForm property={editingRow||{}} ownerId={user.id} {...common} />;
      case "Tenants":
        return <TenantForm tenant={editingRow} ownerId={user.id} {...common} />;
      case "Lease_Agreements":
        return <LeaseForm lease={editingRow} ownerId={user.id} {...common} />;
      case "Payments":
        return <PaymentForm payment={editingRow} ownerId={user.id} {...common} />;
      default:
        return null;
    }
  }

  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/login");
          }}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        {["Properties", "Tenants", "Lease_Agreements", "Payments"].map((t) => (
          <button
            key={t}
            className={`px-3 py-1 rounded ${t === table ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setTable(t as TableName)}
          >
            {t.replace("_", " ")}
          </button>
        ))}
      </div>

      <button className="bg-green-600 text-white p-2 rounded mb-4" onClick={handleAdd}>
        Add New {table.replace("_", " ")}
      </button>

      {showForm && <div className="mb-6">{renderForm()}</div>}

      <OwnerTableView columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}
