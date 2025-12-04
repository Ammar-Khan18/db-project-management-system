// app/owner/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OwnerPropertyForm from "./components/OwnerPropertyForm";
import OwnerTableView,  { TenantForm } from "./components/OwnerTableView";
import LeaseForm from "./components/LeaseForm";
import PaymentForm from "./components/PaymentForm";

type TableName = "Properties" | "Tenants" | "Lease_Agreements" | "Payments";

export default function OwnerDashboard() {
  const router = useRouter();
  const [table, setTable] = useState<TableName>("Properties");
  const [data, setData] = useState<any[]>([]);
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [ownerId, setOwnerId] = useState<number | null>(null);

  // read user from localStorage (login should store this)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) {
        router.push("/login");
        return;
      }
      const user = JSON.parse(raw);
      if (!user || user.role !== "Owner" || !user.owner_id) {
        router.push("/login");
        return;
      }
      setOwnerId(Number(user.owner_id));
    } catch (err) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (ownerId) fetchData();
  }, [table, ownerId]);

  async function fetchData() {
    if (!ownerId) return;
    const res = await fetch(`/api/owner/${table.toLowerCase()}?owner_id=${ownerId}`);
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
      return <OwnerPropertyForm property={editingRow} ownerId={ownerId!} {...common} />;
    case "Tenants":
      return <TenantForm tenant={editingRow} ownerId={ownerId!} {...common} />;
    case "Lease_Agreements":
      return <LeaseForm lease={editingRow} ownerId={ownerId!} {...common} />;
    case "Payments":
      return <PaymentForm payment={editingRow} ownerId={ownerId!} {...common} />;
    default:
      return null;
  }
}


  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <div>
          <button
            onClick={() => { localStorage.removeItem("user"); router.push("/login"); }}
            className="bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
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

      {showForm && (
        <div className="mb-6">
          {renderForm()}
        </div>
      )}

      <OwnerTableView columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}
