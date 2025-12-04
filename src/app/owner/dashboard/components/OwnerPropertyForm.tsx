// app/owner/dashboard/components/OwnerPropertyForm.tsx
"use client";

import { useEffect, useState } from "react";

interface Props {
  property?: any;
  ownerId: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function OwnerPropertyForm({ property, ownerId, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<any>({
    property_type: "",
    address: "",
    city: "",
    size_sqft: 0,
    rooms: 0,
    monthly_rent: 0,
    security_deposit: 0,
    description: "",
    status: "Available",
    agent_id: null,
    ...property,
  });

  useEffect(() => {
    // ensure owner_id is present for a new property
    if (!property && ownerId) setForm((p: any) => ({ ...p, owner_id: ownerId }));
  }, [property, ownerId]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((p: any) => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = property?.id ? "PUT" : "POST";
    await fetch("/api/owner/properties", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, owner_id: ownerId }),
    });
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-white space-y-2">
      <input name="property_type" placeholder="Type" value={form.property_type} onChange={handleChange} className="border p-2 w-full" required />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="border p-2 w-full" required />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} className="border p-2 w-full" required />
      <input name="size_sqft" type="number" placeholder="Size (sqft)" value={form.size_sqft} onChange={handleChange} className="border p-2 w-full" required />
      <input name="rooms" type="number" placeholder="Rooms" value={form.rooms} onChange={handleChange} className="border p-2 w-full" />
      <input name="monthly_rent" type="number" placeholder="Monthly Rent" value={form.monthly_rent} onChange={handleChange} className="border p-2 w-full" required />
      <input name="security_deposit" type="number" placeholder="Security Deposit" value={form.security_deposit} onChange={handleChange} className="border p-2 w-full" />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full" />
      <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full">
        <option value="Available">Available</option>
        <option value="Occupied">Occupied</option>
        <option value="Maintenance">Maintenance</option>
      </select>

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}
