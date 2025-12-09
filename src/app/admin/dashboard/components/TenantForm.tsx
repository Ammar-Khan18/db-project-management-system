"use client";

import { useState } from "react";

interface Tenant {
  id?: number;
  name: string;
  cnic: string;
  phone_no: string;
  email?: string;
  occupation?: string;
  is_active?: "Y" | "N";
}

interface Props {
  tenant?: Tenant;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TenantForm({ tenant, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<Tenant>({
    name: "",
    cnic: "",
    phone_no: "",
    email: "",
    occupation: "",
    is_active: "Y",
    ...tenant,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = tenant?.id ? "PUT" : "POST";
    await fetch("/api/admin/tenants", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onSuccess();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg p-6 flex flex-col gap-4 shadow-md max-w-md text-black"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {tenant?.id ? "Edit Tenant" : "Add New Tenant"}
      </h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        name="cnic"
        placeholder="CNIC"
        value={form.cnic}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        name="phone_no"
        placeholder="Phone"
        value={form.phone_no}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        name="occupation"
        placeholder="Occupation"
        value={form.occupation}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        name="is_active"
        value={form.is_active}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Y">Active</option>
        <option value="N">Inactive</option>
      </select>

      <div className="flex gap-3 mt-4">
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
