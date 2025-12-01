"use client";

import { useState, useEffect } from "react";

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
    <form onSubmit={handleSubmit} className="border p-4 rounded flex flex-col gap-2">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2" required />
      <input name="cnic" placeholder="CNIC" value={form.cnic} onChange={handleChange} className="border p-2" required />
      <input name="phone_no" placeholder="Phone" value={form.phone_no} onChange={handleChange} className="border p-2" required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2" />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border p-2" />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2" required />
      <select name="is_active" value={form.is_active} onChange={handleChange} className="border p-2">
        <option value="Y">Active</option>
        <option value="N">Inactive</option>
      </select>
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded">
          {owner?.id ? "Update" : "Add"}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-2 py-1 rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}
