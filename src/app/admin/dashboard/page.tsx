"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TableView from "./components/TableView";
import OwnerForm from "./components/OwnerForm";
import AgentForm from "./components/AgentForm";
import TenantForm from "./components/TenantForm";
import PropertyForm from "./components/PropertyForm";
import LeaseForm from "./components/LeaseForm";
import PaymentForm from "./components/PaymentForm";

type TableName =
  | "Property_Owners"
  | "Agents"
  | "Tenants"
  | "Properties"
  | "Lease_Agreements"
  | "Payments";

export default function AdminDashboard() {
  const [table, setTable] = useState<TableName>("Property_Owners");
  const [data, setData] = useState<any[]>([]);
  const [editingRow, setEditingRow] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  // Fetch table data whenever selected table changes
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

    await fetch(`/api/admin/${table.toLowerCase()}?id=${row.id}`, {
      method: "DELETE",
    });

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

  // Determine table columns dynamically
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // Render the form dynamically based on the current table
  function renderForm() {
    const commonProps = {
      onSuccess: handleFormSuccess,
      onCancel: () => setShowForm(false),
    };

    switch (table) {
      case "Property_Owners":
        return <OwnerForm owner={editingRow} {...commonProps} />;
      case "Agents":
        return <AgentForm agent={editingRow} {...commonProps} />;
      case "Tenants":
        return <TenantForm tenant={editingRow} {...commonProps} />;
      case "Properties":
        return <PropertyForm property={editingRow} {...commonProps} />;
      case "Lease_Agreements":
        return <LeaseForm lease={editingRow} {...commonProps} />;
      case "Payments":
        return <PaymentForm payment={editingRow} {...commonProps} />;
      default:
        return null;
    }
  }

  const tableButtons = [
    "Property_Owners",
    "Agents",
    "Tenants",
    "Properties",
    "Lease_Agreements",
    "Payments",
  ];

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Table Selection */}
      <div className="flex gap-4 mb-4">
        {tableButtons.map((t) => (
          <button
            key={t}
            className={`px-3 py-1 rounded font-medium ${
              t === table ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setTable(t as TableName)}
          >
            {t.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Add New Button */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
        onClick={handleAdd}
      >
        Add New {table.replace("_", " ")}
      </button>

      {/* Conditional Form */}
      {showForm && renderForm()}

      {/* Table */}
      <TableView columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
}
