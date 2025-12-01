"use client";

import { useEffect, useState } from "react";
import TableView from "./components/TableView";
import OwnerForm from "./components/OwnerForm";
import AgentForm from "./components/AgentForm";
import TenantForm from "./components/TenantForm";
import PropertyForm from "./components/PropertyForm";

type TableName = "Property_Owners" | "Agents" | "Tenants" | "Properties";

export default function AdminDashboard() {
  const [table, setTable] = useState<TableName>("Property_Owners");
  const [data, setData] = useState<any[]>([]);
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch table data
  useEffect(() => {
    fetchData();
  }, [table]);

  async function fetchData() {
    const res = await fetch(`/api/admin/${table.toLowerCase()}`);
    const json = await res.json();
    setData(json);
  }

  function handleEdit(row: any) {
    setEditingRow(row);
    setShowForm(true);
  }

async function handleDelete(row: any) {
  if (!confirm("Are you sure you want to delete this?")) return;

  // Convert table name to lowercase and replace underscores
  const tablePath = table.toLowerCase();

  // Call DELETE API dynamically
  await fetch(`/api/admin/${tablePath}?id=${row.id}`, {
    method: "DELETE",
  });

  // Refresh table data
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

  // Determine columns dynamically
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // Render the correct form based on the selected table
  function renderForm() {
    const formProps = { row: editingRow, onSuccess: handleFormSuccess, onCancel: () => setShowForm(false) };
    switch (table) {
      case "Property_Owners":
        return <OwnerForm owner={editingRow} onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />;
      case "Agents":
        return <AgentForm agent={editingRow} onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />;
      case "Tenants":
        return <TenantForm tenant={editingRow} onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />;
      case "Properties":
        return <PropertyForm property={editingRow} onSuccess={handleFormSuccess} onCancel={() => setShowForm(false)} />;
    }
  }

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Table selection buttons */}
      <div className="flex gap-4 mb-4 text-black">
        {["Property_Owners", "Agents", "Tenants", "Properties"].map((t) => (
          <button
            key={t}
            className={`px-3 py-1 rounded ${t === table ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setTable(t as TableName)}
          >
            {t.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Add button */}
      <button className="bg-green-600 text-white p-2 rounded mb-4" onClick={handleAdd}>
        Add New {table.replace("_", " ")}
      </button>

      {/* Show Form */}
      {showForm && renderForm()}

      {/* Table */}
      <TableView columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}
