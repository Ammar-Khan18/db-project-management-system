"use client";

import React from "react";

interface Props {
  columns: string[];
  data: any[];
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

export default function OwnerTableView({ columns, data, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto border rounded-lg shadow-md bg-white">
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((c) => (
              <th key={c} className="text-left p-3 border-b font-medium text-gray-700">{c}</th>
            ))}
            <th className="p-3 border-b font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              className="hover:bg-gray-50 transition-colors"
            >
              {columns.map((c) => (
                <td key={`${row.id ?? rowIndex}-${c}`} className="p-3 border-b text-gray-800">
                  {String(row[c])}
                </td>
              ))}
              <td className="p-3 border-b flex gap-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition"
                  onClick={() => onEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                  onClick={() => onDelete(row)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* TenantForm */
export function TenantForm({ tenant, ownerId, onSuccess, onCancel }: any) {
  const [form, setForm] = React.useState<any>({
    name: "",
    cnic: "",
    phone_no: "",
    email: "",
    occupation: "",
    ...tenant,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((p: any) => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = tenant?.id ? "PUT" : "POST";
    await fetch("/api/owner/tenants", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, owner_id: ownerId }),
    });
    onSuccess();
  }

  return (
    <form className="border p-6 rounded-lg bg-white shadow-md flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold text-gray-800">{tenant?.id ? "Edit Tenant" : "Add New Tenant"}</h2>
      
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="cnic"
        placeholder="CNIC"
        value={form.cnic}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="phone_no"
        placeholder="Phone"
        value={form.phone_no}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="occupation"
        placeholder="Occupation"
        value={form.occupation}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          {tenant?.id ? "Update" : "Add"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
