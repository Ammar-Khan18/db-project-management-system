"use client";

import React, { useState } from "react";
import { useUser } from "../context/UserContext";

export default function AgentsClient({ agents }: { agents: any[] }) {
  const { currentUser } = useUser(); // "guest" or "admin"
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    cnic: "",
    phone_no: "",
    address: "",
    city: "",
    email: "",
    commision_rate: "",
  });

  async function addAgent() {
    await fetch("/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    window.location.reload();
  }

  async function deleteAgent(id: number) {
    await fetch("/api/agents", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    window.location.reload();
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-3xl font-bold mb-4">Agents</h1>

      {currentUser === "admin" && (
        <button
          onClick={() => setShowModal(true)}
          className="mb-4 px-4 py-2 bg-black text-white rounded"
        >
          Add Agent
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agents.map((a) => (
          <div key={a.id} className="p-4 bg-white shadow rounded text-black">
            <p><strong>{a.name}</strong></p>
            <p>CNIC: {a.cnic}</p>
            <p>Phone: {a.phone_no}</p>
            <p>Address: {a.address}</p>
            <p>City: {a.city}</p>
            <p>Email: {a.email}</p>
            <p>Commission Rate: {a.commision_rate}%</p>

            {currentUser === "admin" && (
              <button
                onClick={() => deleteAgent(a.id)}
                className="mt-2 px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ADD AGENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Add Agent</h2>

            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full mb-2"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="CNIC"
              className="border p-2 w-full mb-2"
              onChange={(e) => setForm({ ...form, cnic: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border p-2 w-full mb-2"
              onChange={(e) => setForm({ ...form, phone_no: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-2 w-full mb-2"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="City"
              className="border p-2 w-full mb-2"
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-full mb-2"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="number"
              placeholder="Commission Rate"
              className="border p-2 w-full mb-4"
              onChange={(e) => setForm({ ...form, commision_rate: e.target.value })}
            />

            <button
              onClick={addAgent}
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
