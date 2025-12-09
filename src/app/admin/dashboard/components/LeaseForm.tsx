"use client";

import { useState, useEffect } from "react";

interface Lease {
  id?: number;
  property_id: number;
  tenant_id: number;
  agent_id?: number;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  security_deposit?: number;
  lease_status?: "Active" | "Expired" | "Terminated";
  payment_due_date?: number;
  terms_conditions?: string;
}

interface Props {
  lease?: Lease;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function LeaseForm({ lease, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<Lease>({
    property_id: 0,
    tenant_id: 0,
    start_date: "",
    end_date: "",
    monthly_rent: 0,
    lease_status: "Active",
    payment_due_date: 1,
    ...lease,
  });

  const [properties, setProperties] = useState<any[]>([]);
  const [tenants, setTenants] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [resProps, resTenants, resAgents] = await Promise.all([
        fetch("/api/admin/properties"),
        fetch("/api/admin/tenants"),
        fetch("/api/admin/agents"),
      ]);
      setProperties(await resProps.json());
      setTenants(await resTenants.json());
      setAgents(await resAgents.json());
    }
    fetchData();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = lease?.id ? "PUT" : "POST";

    await fetch("/api/admin/lease_agreements", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onSuccess();
  }

  return (
    <form className="bg-white border rounded-lg p-6 flex flex-col gap-4 shadow-md max-w-lg text-black" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold text-black">
        {lease?.id ? "Edit Lease" : "Add New Lease"}
      </h2>

      <select
        name="property_id"
        value={form.property_id}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Property</option>
        {properties.map((p) => (
          <option key={p.id} value={p.id}>
            {p.address}
          </option>
        ))}
      </select>

      <select
        name="tenant_id"
        value={form.tenant_id}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Tenant</option>
        {tenants.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
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

      <div className="flex gap-2">
        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
        />
        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
        />
      </div>

      <input
        type="number"
        name="monthly_rent"
        placeholder="Monthly Rent"
        value={form.monthly_rent}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="number"
        name="security_deposit"
        placeholder="Security Deposit"
        value={form.security_deposit || ""}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        name="lease_status"
        value={form.lease_status}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Active">Active</option>
        <option value="Expired">Expired</option>
        <option value="Terminated">Terminated</option>
      </select>

      <input
        type="number"
        name="payment_due_date"
        min={1}
        max={28}
        value={form.payment_due_date}
        onChange={handleChange}
        placeholder="Payment Due Day"
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        name="terms_conditions"
        placeholder="Terms & Conditions"
        value={form.terms_conditions || ""}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />

      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          {lease?.id ? "Update" : "Add"}
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
