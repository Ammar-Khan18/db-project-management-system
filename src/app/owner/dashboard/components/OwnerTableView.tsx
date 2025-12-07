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
    <div className="overflow-auto border rounded">
      <table className="w-full table-auto">
        <thead className="">
          <tr>
            {columns.map((c) => (
              <th key={c} className="text-left p-2 border-b">{c}</th>
            ))}
            <th className="p-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id ?? rowIndex} className="">
              {columns.map((c) => (
                <td key={`${row.id ?? rowIndex}-${c}`} className="p-2 border-b">
                  {String(row[c])}
                </td>
              ))}
              <td className="p-2 border-b flex gap-2">
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                  onClick={() => onEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded"
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

/* TenantForm remains the same */
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
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-white">
      <input name="name" placeholder="Name" className="border p-2 w-full mb-2" value={form.name} onChange={handleChange} required />
      <input name="cnic" placeholder="CNIC" className="border p-2 w-full mb-2" value={form.cnic} onChange={handleChange} required />
      <input name="phone_no" placeholder="Phone" className="border p-2 w-full mb-2" value={form.phone_no} onChange={handleChange} required />
      <input name="email" placeholder="Email" className="border p-2 w-full mb-2" value={form.email} onChange={handleChange} />
      <input name="occupation" placeholder="Occupation" className="border p-2 w-full mb-2" value={form.occupation} onChange={handleChange} />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}
