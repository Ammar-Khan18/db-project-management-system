// app/properties/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/app/context/UserContext";

type Property = {
  id: number;
  owner_id: number;
  agent_id: number;
  property_type: string;
  address: string;
  city: string;
  size_sqft?: number;
  rooms?: number;
  monthly_rent?: number;
  security_deposit?: number;
  description?: string;
};

type Owner = { id: number; name: string };

type Agent = { id: number; name: string };

export default function PropertiesPage() {
  const { currentUser } = useUser();
  const [properties, setProperties] = useState<Property[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newProperty, setNewProperty] = useState<Partial<Property>>({});

const fetchProperties = async () => {
  try {
    const res = await fetch("/api/properties");
    const data = await res.json();

    // FIX:
    setProperties(Array.isArray(data.properties) ? data.properties : []);
  } catch (e) {
    console.error("fetch properties error", e);
  }
};


  const fetchOwners = async () => {
    try {
      const res = await fetch("/api/owners");
      const data = await res.json();
      setOwners(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("fetch owners error", e);
    }
  };
    const fetchAgents = async () => {
    try {
      const res = await fetch("/api/agents");
      const data = await res.json();
      setAgents(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("fetch agents error", e);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // when admin toggled, load owners (owner select needed)
  useEffect(() => {
    if (currentUser === "admin") {
      fetchOwners();
      fetchAgents();
    }
  }, [currentUser]);

  const handleAdd = async () => {
    // basic validation
    if (!newProperty.owner_id || !newProperty.property_type || !newProperty.address) {
      alert("Please fill Owner, Property Type and Address.");
      return;
    }

    await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner_id: Number(newProperty.owner_id),
        agent_id: newProperty.agent_id ? Number(newProperty.agent_id) : null,
        property_type: newProperty.property_type,
        address: newProperty.address,
        city: newProperty.city || "",
        size_sqft: newProperty.size_sqft ? Number(newProperty.size_sqft) : null,
        rooms: newProperty.rooms ? Number(newProperty.rooms) : null,
        monthly_rent: newProperty.monthly_rent ? Number(newProperty.monthly_rent) : null,
        security_deposit: newProperty.security_deposit ? Number(newProperty.security_deposit) : null,
        description: newProperty.description || "",
      }),
    });

    setShowModal(false);
    setNewProperty({});
    fetchProperties();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this property?")) return;
    await fetch(`/api/properties?id=${id}`, { method: "DELETE" });
    fetchProperties();
  };

  return (
    <div className="text-black">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">🏠 Properties</h1>

        {currentUser === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Property
          </button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-black">
            <h2 className="text-xl font-semibold mb-3">Add Property</h2>

            <label className="block mb-2 text-sm">Owner</label>
            <select
              value={newProperty.owner_id ?? ""}
              onChange={(e) => setNewProperty({ ...newProperty, owner_id: Number(e.target.value) })}
              className="w-full border p-2 mb-3"
            >
              <option value="">-- select owner --</option>
              {owners.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
            
            <label className="block mb-2 text-sm">Agent</label>
            <select
              value={newProperty.agent_id ?? ""}
              onChange={(e) => setNewProperty({ ...newProperty, agent_id: Number(e.target.value) })}
              className="w-full border p-2 mb-3"
            >
              <option value="">-- select agent --</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            <input
              className="w-full border p-2 mb-3"
              placeholder="Property Type"
              value={newProperty.property_type ?? ""}
              onChange={(e) => setNewProperty({ ...newProperty, property_type: e.target.value })}
            />

            <input
              className="w-full border p-2 mb-3"
              placeholder="Address"
              value={newProperty.address ?? ""}
              onChange={(e) => setNewProperty({ ...newProperty, address: e.target.value })}
            />

            <input
              className="w-full border p-2 mb-3"
              placeholder="City"
              value={newProperty.city ?? ""}
              onChange={(e) => setNewProperty({ ...newProperty, city: e.target.value })}
            />

            <div className="flex gap-2 mb-3">
              <input
                className="w-1/2 border p-2"
                placeholder="Size (sqft)"
                type="number"
                value={newProperty.size_sqft ?? ""}
                onChange={(e) => setNewProperty({ ...newProperty, size_sqft: e.target.value ? Number(e.target.value) : undefined })}
              />
              <input
                className="w-1/2 border p-2"
                placeholder="Rooms"
                type="number"
                value={newProperty.rooms ?? ""}
                onChange={(e) => setNewProperty({ ...newProperty, rooms: e.target.value ? Number(e.target.value) : undefined })}
              />
            </div>

            <div className="flex gap-2 mb-3">
              <input
                className="w-1/2 border p-2"
                placeholder="Monthly Rent"
                type="number"
                value={newProperty.monthly_rent ?? ""}
                onChange={(e) => setNewProperty({ ...newProperty, monthly_rent: e.target.value ? Number(e.target.value) : undefined })}
              />
              <input
                className="w-1/2 border p-2"
                placeholder="Security Deposit"
                type="number"
                value={newProperty.security_deposit ?? ""}
                onChange={(e) => setNewProperty({ ...newProperty, security_deposit: e.target.value ? Number(e.target.value) : undefined })}
              />
            </div>

            <textarea
              className="w-full border p-2 mb-3"
              placeholder="Description"
              value={newProperty.description ?? ""}
              onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-3 py-1 border rounded">
                Cancel
              </button>
              <button onClick={handleAdd} className="px-3 py-1 bg-blue-600 text-white rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid: admin=1col, guest=3col */}
      <div className={currentUser === "admin" ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-3 gap-4"}>
        {properties.map((p) => (
          <div key={p.id} className="bg-white border rounded-xl p-5 relative">
            <h3 className="text-lg font-semibold">{p.property_type} — {p.city}</h3>
            <p className="text-sm text-gray-700">{p.address}</p>
            <p className="mt-2 font-medium">Rent: Rs {p.monthly_rent ?? "N/A"}</p>
            {p.description && <p className="mt-2 text-sm">{p.description}</p>}

            {currentUser === "admin" && (
              <button
                onClick={() => handleDelete(p.id)}
                className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
