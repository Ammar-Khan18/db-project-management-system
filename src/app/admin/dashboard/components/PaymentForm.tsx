"use client";

import { useState, useEffect } from "react";

interface Payment {
  id?: number;
  tenant_id: number;
  amount: number;
  payment_type: "Rent" | "Deposit" | "Utility" | "Other";
  payment_status?: "Pending" | "Completed" | "Failed";
  description?: string;
}

interface Props {
  payment?: Payment;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentForm({ payment, onSuccess, onCancel }: Props) {
  const [form, setForm] = useState<Payment>({
    tenant_id: 0,
    amount: 0,
    payment_type: "Rent",
    payment_status: "Pending",
    ...payment,
  });

  const [tenants, setTenants] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTenants() {
      const res = await fetch("/api/admin/tenants");
      setTenants(await res.json());
    }
    fetchTenants();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = payment?.id ? "PUT" : "POST";

    await fetch("/api/admin/payments", {
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
        {payment?.id ? "Edit Payment" : "Add New Payment"}
      </h2>

      <select
        name="tenant_id"
        value={form.tenant_id}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Tenant</option>
        {tenants.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <select
        name="payment_type"
        value={form.payment_type}
        onChange={handleChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Failed">Failed</option>
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description || ""}
        onChange={handleChange}
        rows={4}
        className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-3 mt-4">
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
