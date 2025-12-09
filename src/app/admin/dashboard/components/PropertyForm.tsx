"use client";

import { useState, useEffect } from "react";

interface Property {
  id?: number;
  owner_id: number;
  agent_id?: number;
  property_type: string;
  address: string;
  city: string;
  size_sqft: number;
  rooms?: number;
  monthly_rent: number;
  security_deposit?: number;
  status?: string;
  description?: string;
}

interface Props {
  property?: Property;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PropertyForm({ property, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<Property>({
    owner_id: 0,
    property_type: "",
    address: "",
    city: "",
    size_sqft: 0,
    monthly_rent: 0,
    status: "Available",
    ...property,
  });

  const [owners, setOwners] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOwners() {
      const res = await fetch("/api/admin/property_owners");
      setOwners(await res.json());
    }
    async function fetchAgents() {
      const res = await fetch("/api/admin/agents");
      setAgents(await res.json());
    }
    fetchOwners();
    fetchAgents();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = property?.id ? "PUT" : "POST";
    await fetch("/api/admin/properties", {
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
        {property?.id ? "Edit Property" : "Add New Property"}
      </h2>

      <select
        name="owner_id"
        value={form.owner_id}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Owner</option>
        {owners.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>

      <select
        name="agent_id"
        value={form.agent_id || ""}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Agent</option>
        {agents.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>

      <input
        name="property_type"
        placeholder="Property Type"
        value={form.property_type}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="size_sqft"
        type="number"
        placeholder="Size (sqft)"
        value={form.size_sqft}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="rooms"
        type="number"
        placeholder="Rooms"
        value={form.rooms || ""}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="monthly_rent"
        type="number"
        placeholder="Monthly Rent"
        value={form.monthly_rent}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        name="security_deposit"
        type="number"
        placeholder="Security Deposit"
        value={form.security_deposit || ""}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description || ""}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        name="status"
        value={form.status || "Available"}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Available">Available</option>
        <option value="Occupied">Occupied</option>
        <option value="Maintenance">Maintenance</option>
      </select>

      <div className="flex gap-3 mt-4">
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
