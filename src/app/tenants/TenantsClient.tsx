"use client";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";

export default function TenantsClient({ tenants }: { tenants: any[] }) {
  const { currentUser } = useUser(); // "guest" or "admin"
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_no: "",
    cnic: "",
    occupation: "",
  });

  async function addTenant() {
    await fetch("/api/tenants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    window.location.reload();
  }

  async function deleteTenant(id: number) {
    await fetch("/api/tenants", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black p-10">
      <h1 className="text-3xl font-bold mb-6">Tenants</h1>

      {/* Admin Add Button */}
      {currentUser === "admin" && (
        <button
          onClick={() => setShowModal(true)}
          className="mb-6 px-4 py-2 bg-black text-white rounded"
        >
          Add Tenant
        </button>
      )}

      {/* Tenant List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tenants.map((t) => (
          <div key={t.id} className="p-4 bg-white shadow rounded text-black">
            <p><strong>Name:</strong> {t.name}</p>
            <p><strong>Email:</strong> {t.email}</p>
            <p><strong>Phone:</strong> {t.phone_no}</p>
            <p><strong>CNIC:</strong> {t.cnic}</p>
            <p><strong>Occupation:</strong> {t.occupation}</p>

            {currentUser === "admin" && (
              <button
                onClick={() => deleteTenant(t.id)}
                className="mt-3 px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Tenant Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-80 text-black">
            <h2 className="text-xl font-bold mb-4">Add Tenant</h2>

            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full mb-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-full mb-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-2 w-full mb-2"
              value={form.phone_no}
              onChange={(e) => setForm({ ...form, phone_no: e.target.value })}
            />
            <input
              type="text"
              placeholder="CNIC"
              className="border p-2 w-full mb-2"
              value={form.cnic}
              onChange={(e) => setForm({ ...form, cnic: e.target.value })}
            />
            <input
              type="text"
              placeholder="Occupation"
              className="border p-2 w-full mb-4"
              value={form.occupation}
              onChange={(e) =>
                setForm({ ...form, occupation: e.target.value })
              }
            />

            <button
              onClick={addTenant}
              className="bg-black text-white px-4 py-2 rounded w-full"
            >
              Add
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="mt-2 text-center w-full underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
