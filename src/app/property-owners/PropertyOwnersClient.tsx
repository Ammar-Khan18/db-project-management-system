"use client";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";

export default function PropertyOwnersClient({ owners }: { owners: any[] }) {
  const { currentUser } = useUser(); // "guest" or "admin"
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    cnic: "",
    phone_no: "",
    email: "",
    address: "",
    city: "",
  });

  async function addOwner() {
    await fetch("/api/property-owners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    window.location.reload();
  }

  async function deleteOwner(id: number) {
    await fetch("/api/property-owners", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    window.location.reload();
  }

  return (
    <div className="text-black">
      <h1 className="text-3xl font-bold mb-4 text-white">Property Owners</h1>

      {currentUser === "admin" && (
        <button
          onClick={() => setShowModal(true)}
          className="mb-6 px-4 py-2 bg-black text-white rounded"
        >
          Add Property Owner
        </button>
      )}

      <div className={`grid ${currentUser === "admin" ? "grid-cols-1" : "grid-cols-3"} gap-4`}>
        {owners.map((o) => (
          <div key={o.id} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
            <h2 className="font-semibold text-lg mb-2">{o.name}</h2>
            <p>CNIC: {o.cnic}</p>
            <p>Phone: {o.phone_no}</p>
            <p>Email: {o.email}</p>
            <p>Address: {o.address}</p>
            <p>City: {o.city}</p>

            {currentUser === "admin" && (
              <button
                onClick={() => deleteOwner(o.id)}
                className="mt-3 px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Property Owner Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 text-black">
            <h2 className="text-xl font-bold mb-4">Add Property Owner</h2>

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
              placeholder="Phone"
              className="border p-2 w-full mb-2"
              onChange={(e) => setForm({ ...form, phone_no: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 w-full mb-2"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              className="border p-2 w-full mb-4"
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />

            <button
              onClick={addOwner}
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
