"use client";

import { useState } from "react";

interface Owner {
  id?: number;
  name: string;
  cnic: string;
  phone_no: string;
  email?: string;
  address?: string;
  city: string;
  is_active?: "Y" | "N";
}

interface Props {
  owner?: Owner;           // If editing, pass owner object
  onSuccess: () => void;   // Callback after add/edit
  onCancel: () => void;
}

export default function OwnerForm({ owner, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<Owner>({
    name: "",
    cnic: "",
    phone_no: "",
    email: "",
    address: "",
    city: "",
    is_active: "Y",
    ...owner,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = owner?.id ? "PUT" : "POST";
    await fetch("/api/admin/property_owners", {
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
        {owner?.id ? "Edit Property Owner" : "Add New Property Owner"}
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
        required
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
          {owner?.id ? "Update" : "Add"}
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
