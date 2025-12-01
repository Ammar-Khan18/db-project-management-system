"use client";
import { useEffect, useState } from "react";

interface Property {
  id: number;
  property_type: string;
  address: string;
  city: string;
  monthly_rent: number;
  status: string;
}

export default function OwnerDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      // Replace with your API call: fetch owner's properties
      const res = await fetch("/api/owner/properties");
      const data = await res.json();
      setProperties(data);
    }
    fetchProperties();
  }, []);

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Owner Dashboard</h1>
      <button className="bg-green-600 text-white p-2 rounded mb-4">Add New Property</button>

      <h2 className="text-2xl font-semibold mb-2">My Properties</h2>
      <ul className="space-y-2">
        {properties.map((p) => (
          <li key={p.id} className="border p-3 rounded">
            <p><strong>Type:</strong> {p.property_type}</p>
            <p><strong>Address:</strong> {p.address}, {p.city}</p>
            <p><strong>Rent:</strong> ${p.monthly_rent}</p>
            <p><strong>Status:</strong> {p.status}</p>
            <button className="bg-blue-600 text-white p-1 rounded mt-2">Manage Agents</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
