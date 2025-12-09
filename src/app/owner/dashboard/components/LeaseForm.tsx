"use client";

import { useEffect, useState } from "react";

export default function LeaseForm({ lease, ownerId, onSuccess, onCancel }: any) {
  const [form, setForm] = useState<any>({
    property_id: 0,
    tenant_id: 0,
    agent_id: null,
    start_date: "",
    end_date: "",
    monthly_rent: 0,
    security_deposit: 0,
    lease_status: "Active",
    payment_due_date: 1,
    terms_conditions: "",
    ...lease,
  });

  const [properties, setProperties] = useState<any[]>([]);
  const [tenants, setTenants] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const p = await fetch(`/api/owner/properties?owner_id=${ownerId}`).then(r => r.json());
      setProperties(p);
      const t = await fetch(`/api/owner/tenants?owner_id=${ownerId}`).then(r => r.json());
      setTenants(t);
      const a = await fetch(`/api/admin/agents`).then(r => r.json());
      setAgents(a);
    }
    load();
  }, [ownerId]);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm((p: any) => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = lease?.id ? "PUT" : "POST";
    await fetch("/api/owner/lease_agreements", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, owner_id: ownerId }),
    });
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 bg-white shadow-md flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">{lease?.id ? "Edit Lease" : "Add New Lease"}</h2>

      <select name="property_id" value={form.property_id} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        <option value="">Select Property</option>
        {properties.map((p: any) => <option key={p.id} value={p.id}>{p.address}</option>)}
      </select>

      <select name="tenant_id" value={form.tenant_id} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        <option value="">Select Tenant</option>
        {tenants.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>

      <select name="agent_id" value={form.agent_id || ""} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Select Agent</option>
        {agents.map((a: any) => <option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />

      <input type="number" name="monthly_rent" value={form.monthly_rent} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" required />
      <input type="number" name="security_deposit" value={form.security_deposit} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <select name="lease_status" value={form.lease_status} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="Active">Active</option>
        <option value="Expired">Expired</option>
        <option value="Terminated">Terminated</option>
      </select>

      <input type="number" name="payment_due_date" min={1} max={28} value={form.payment_due_date} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <textarea name="terms_conditions" value={form.terms_conditions} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <div className="flex gap-3 mt-2">
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition">
          {lease?.id ? "Update" : "Add"}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded transition">
          Cancel
        </button>
      </div>
    </form>
  );
}
