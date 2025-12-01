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
      const resProps = await fetch("/api/admin/properties");
      setProperties(await resProps.json());
      const resTenants = await fetch("/api/admin/tenants");
      setTenants(await resTenants.json());
      const resAgents = await fetch("/api/admin/agents");
      setAgents(await resAgents.json());
    }
    fetchData();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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
    <form onSubmit={handleSubmit} className="border p-4 rounded flex flex-col gap-2">
      <select name="property_id" value={form.property_id} onChange={handleChange} required className="border p-2">
        <option value="">Select Property</option>
        {properties.map((p) => <option key={p.id} value={p.id}>{p.address}</option>)}
      </select>

      <select name="tenant_id" value={form.tenant_id} onChange={handleChange} required className="border p-2">
        <option value="">Select Tenant</option>
        {tenants.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>

      <select name="agent_id" value={form.agent_id || ""} onChange={handleChange} className="border p-2">
        <option value="">Select Agent</option>
        {agents.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="border p-2" required />
      <input type="date" name="end_date" value={form.end_date} onChange={handleChange} className="border p-2" required />
      <input type="number" name="monthly_rent" placeholder="Monthly Rent" value={form.monthly_rent} onChange={handleChange} className="border p-2" required />
      <input type="number" name="security_deposit" placeholder="Security Deposit" value={form.security_deposit || ""} onChange={handleChange} className="border p-2" />
      <select name="lease_status" value={form.lease_status} onChange={handleChange} className="border p-2">
        <option value="Active">Active</option>
        <option value="Expired">Expired</option>
        <option value="Terminated">Terminated</option>
      </select>
      <input type="number" name="payment_due_date" min={1} max={28} value={form.payment_due_date} onChange={handleChange} className="border p-2" placeholder="Payment Due Day" />
      <textarea name="terms_conditions" placeholder="Terms & Conditions" value={form.terms_conditions || ""} onChange={handleChange} className="border p-2" />

      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded">{lease?.id ? "Update" : "Add"}</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}
