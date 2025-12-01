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

export default function GuestDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchAvailable() {
      const res = await fetch("/api/properties/available");
      const data = await res.json();
      setProperties(data);
    }
    fetchAvailable();
  }, []);

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Properties</h1>

      <ul className="space-y-2">
        {properties.map((p) => (
          <li key={p.id} className="border p-3 rounded">
            <p><strong>Type:</strong> {p.property_type}</p>
            <p><strong>Address:</strong> {p.address}, {p.city}</p>
            <p><strong>Rent:</strong> ${p.monthly_rent}</p>
            <p><strong>Status:</strong> {p.status}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
