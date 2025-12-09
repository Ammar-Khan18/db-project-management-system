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
    owner_id: ownerId,
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
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 bg-white shadow-md flex flex-col gap-4 text-black">
      <h2 className="text-lg font-semibold text-gray-800">{property?.id ? "Edit Property" : "Add New Property"}</h2>

      <input
        name="property_type"
        placeholder="Property Type"
        value={form.property_type}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        name="size_sqft"
        type="number"
        placeholder="Size (sqft)"
        value={form.size_sqft}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        name="rooms"
        type="number"
        placeholder="Rooms"
        value={form.rooms}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        name="monthly_rent"
        type="number"
        placeholder="Monthly Rent"
        value={form.monthly_rent}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        name="security_deposit"
        type="number"
        placeholder="Security Deposit"
        value={form.security_deposit}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Available">Available</option>
        <option value="Occupied">Occupied</option>
        <option value="Maintenance">Maintenance</option>
      </select>

      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          {property?.id ? "Update" : "Add"}
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
