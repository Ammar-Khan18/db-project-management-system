"use client";

import { useState } from "react";

interface Agent {
  id?: number;
  name: string;
  cnic: string;
  phone_no: string;
  email?: string;
  address?: string;
  city?: string;
  commision_rate?: number;
  is_active?: "Y" | "N";
}

interface Props {
  agent?: Agent;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AgentForm({ agent, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<Agent>({
    name: "",
    cnic: "",
    phone_no: "",
    email: "",
    address: "",
    city: "",
    commision_rate: 2.0,
    is_active: "Y",
    ...agent,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = agent?.id ? "PUT" : "POST";

    await fetch("/api/admin/agents", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border rounded-lg p-6 flex flex-col gap-4 shadow-md max-w-md text-black">
      <h2 className="text-xl font-semibold text-black">{agent?.id ? "Edit Agent" : "Add New Agent"}</h2>

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
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        name="commision_rate"
        type="number"
        placeholder="Commission %"
        value={form.commision_rate}
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
          {agent?.id ? "Update" : "Add"}
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
