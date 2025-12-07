"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OwnerPropertyForm from "./components/OwnerPropertyForm";
import OwnerTableView from "./components/OwnerTableView";

type TableName = "Properties" | "Tenants" | "Lease_Agreements" | "Payments";

export default function OwnerDashboard() {
  const router = useRouter();
  const [table, setTable] = useState<TableName>("Properties");
  const [data, setData] = useState<any[]>([]);
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [ownerId, setOwnerId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/owner/me")
      .then(res => res.json())
      .then(json => {
        if (!json.success) {
          router.push("/login");
          return;
        }
        setOwnerId(json.owner.owner_id);
      })
      .catch(() => router.push("/login"));
  }, [router]);

  useEffect(() => {
    if (!ownerId) return;
    fetchData();
  }, [table, ownerId]);

async function fetchData() {
  try {
    const res = await fetch(`/api/owner/${table.toLowerCase()}?owner_id=${ownerId}`);
    const json = await res.json();

    if (!json.success) {
      console.error("API returned error:", json.message);
      setData([]); // reset data on error
      return;
    }

    setData(json.data || []);
  } catch (err) {
    console.error("Failed to fetch data", err);
    setData([]);
  }
}





  function handleEdit(row: any) { setEditingRow(row); setShowForm(true); }
  function handleAdd() { setEditingRow(null); setShowForm(true); }
  function handleDelete(row: any) {
    if (!confirm("Are you sure you want to delete this?")) return;
    fetch(`/api/owner/properties?id=${row.id}`, { method: "DELETE" }).then(() => fetchData());
  }

  function handleFormSuccess() { setShowForm(false); fetchData(); }

  function renderForm() {
    const common = { onSuccess: handleFormSuccess, onCancel: () => setShowForm(false) };
    if (!ownerId) return null;
    switch (table) {
      case "Properties":
        return <OwnerPropertyForm property={editingRow || {}} ownerId={ownerId} {...common} />;
      default:
        return null;
    }
  }

  return (
    <main className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <button onClick={() => { fetch("/api/logout"); router.push("/login"); }} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
      </div>

      <div className="flex gap-4 mb-4 text-black">
        {["Properties", "Tenants", "Lease_Agreements", "Payments"].map(t => (
          <button key={t} className={`px-3 py-1 rounded ${t === table ? "bg-blue-600 text-white" : "bg-gray-200"}`} onClick={() => setTable(t as TableName)}>{t.replace("_", " ")}</button>
        ))}
      </div>

      <button className="bg-green-600 text-white p-2 rounded mb-4" onClick={handleAdd}>Add New {table.replace("_", " ")}</button>
      {showForm && <div className="mb-6">{renderForm()}</div>}

      <OwnerTableView columns={data.length > 0 ? Object.keys(data[0]) : []} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}
