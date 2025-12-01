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
    <form onSubmit={handleSubmit} className="border p-4 rounded flex flex-col gap-2">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2" required />
      <input name="cnic" placeholder="CNIC" value={form.cnic} onChange={handleChange} className="border p-2" required />
      <input name="phone_no" placeholder="Phone" value={form.phone_no} onChange={handleChange} className="border p-2" required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2" />
      <input name="occupation" placeholder="Occupation" value={form.occupation} onChange={handleChange} className="border p-2" />
      <select name="is_active" value={form.is_active} onChange={handleChange} className="border p-2">
        <option value="Y">Active</option>
        <option value="N">Inactive</option>
      </select>
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded">{tenant?.id ? "Update" : "Add"}</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}
