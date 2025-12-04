// app/owner/dashboard/components/PaymentForm.tsx
"use client";

import { useEffect, useState } from "react";

export default function PaymentForm({ payment, ownerId, onSuccess, onCancel }: any) {
  const [form, setForm] = useState<any>({
    tenant_id: 0,
    amount: 0,
    payment_type: "Rent",
    payment_status: "Pending",
    description: "",
    ...payment,
  });

  const [tenants, setTenants] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const t = await fetch(`/api/owner/tenants?owner_id=${ownerId}`).then(r => r.json());
      setTenants(t);
    }
    load();
  }, [ownerId]);

  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm((p: any) => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = payment?.id ? "PUT" : "POST";
    await fetch("/api/owner/payments", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, owner_id: ownerId }),
    });
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-white space-y-2">
      <select name="tenant_id" value={form.tenant_id} onChange={handleChange} className="border p-2 w-full" required>
        <option value="">Select tenant</option>
        {tenants.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>

      <input type="number" name="amount" value={form.amount} onChange={handleChange} className="border p-2 w-full" required />
      <select name="payment_type" value={form.payment_type} onChange={handleChange} className="border p-2 w-full">
        <option value="Rent">Rent</option>
        <option value="Deposit">Deposit</option>
        <option value="Utility">Utility</option>
        <option value="Other">Other</option>
      </select>
      <select name="payment_status" value={form.payment_status} onChange={handleChange} className="border p-2 w-full">
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Failed">Failed</option>
      </select>
      <textarea name="description" value={form.description} onChange={handleChange} className="border p-2 w-full" />

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
      </div>
    </form>
  );
}
