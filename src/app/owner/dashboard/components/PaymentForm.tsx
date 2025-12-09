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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
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
    <form onSubmit={handleSubmit} className="border rounded-lg p-6 bg-white shadow-md flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">{payment?.id ? "Edit Payment" : "Add New Payment"}</h2>

      <select
        name="tenant_id"
        value={form.tenant_id}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Tenant</option>
        {tenants.map((t: any) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <select
        name="payment_type"
        value={form.payment_type}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Rent">Rent</option>
        <option value="Deposit">Deposit</option>
        <option value="Utility">Utility</option>
        <option value="Other">Other</option>
      </select>

      <select
        name="payment_status"
        value={form.payment_status}
        onChange={handleChange}
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Failed">Failed</option>
      </select>

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-3 mt-2">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          {payment?.id ? "Update" : "Add"}
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
