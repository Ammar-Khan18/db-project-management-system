"use client";
import { useEffect, useState } from "react";

export default function BrowseProperties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/public/properties");
      const json = await res.json();
      setProperties(json.data || []);
    }
    load();
  }, []);

  const leaseProperty = async (property: any) => {
    const tenantId = 1; // update later

    const res = await fetch("/api/lease-property", {
      method: "POST",
      body: JSON.stringify({
        property_id: property.id,
        tenant_id: tenantId,
        owner_id: property.owner_id,
        monthly_rent: property.rent_amount,
        duration_months: 12
      })
    });

    const json = await res.json();
    alert(json.message);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>

      <div className="grid grid-cols-3 gap-6">
        {properties.map((prop: any) => (
          <div className="border rounded-lg shadow p-4" key={prop.id}>
            {/* Image placeholder */}
            <div className="h-40 w-full bg-gray-200 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>

            <h2 className="text-xl font-semibold">{prop.title}</h2>
            <p className="text-gray-600">{prop.location}</p>
            <p className="text-gray-500 text-sm">{prop.description}</p>

            <p className="mt-2 font-bold">Rs {prop.rent_amount} / month</p>
            <p className="text-sm text-gray-700">
              {prop.rooms} rooms • {prop.size_sqft} sq ft
            </p>

            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => leaseProperty(prop)}
            >
              Lease Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
