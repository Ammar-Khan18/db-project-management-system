"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Property = {
  id: number;
  owner_id?: number;
  property_type?: string;
  title?: string;
  location?: string;
  rent_amount?: number;
  rooms?: number;
  size_sqft?: number;
  description?: string;
  status?: string;
};

export default function BrowseProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/public/properties");
        const json = await res.json();
        setProperties(json.data || []);
      } catch (err) {
        console.error("Error loading properties:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const leaseProperty = async (property: Property) => {
    if (!confirm("Do you want to lease this property?")) return;
    try {
      const res = await fetch("/api/lease-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: property.id, duration_months: 12 }),
      });

      const json = await res.json();
      alert(json.message || (json.success ? "Leased" : "Failed"));

      if (json.success) {
        setProperties((prev) => prev.filter((p) => p.id !== property.id));
      } else if (res.status === 401) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Lease error:", err);
      alert("Error leasing property");
    }
  };

  function handleLogout() {
    fetch("/api/logout").then(() => router.push("/"));
  }

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Available Properties</h1>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/my-leases")}
            className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition"
          >
            My Leases
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-700">Loading properties...</p>
      ) : properties.length === 0 ? (
        <p className="text-gray-600">No properties available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="border rounded-lg shadow-sm bg-white hover:shadow-md transition p-4 flex flex-col justify-between"
            >
              <div className="h-48 w-full bg-gray-100 rounded mb-4 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {prop.title ?? `${prop.property_type} in ${prop.location}`}
              </h2>
              <p className="text-gray-600">{prop.location}</p>
              <p className="text-gray-500 text-sm mt-2 line-clamp-3">{prop.description}</p>

              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="font-bold text-gray-800">Rs {prop.rent_amount}</p>
                  <p className="text-sm text-gray-700">{prop.rooms} rooms • {prop.size_sqft} sq ft</p>
                </div>
                {prop.status === "Available" && (
                  <button
                    onClick={() => leaseProperty(prop)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition"
                  >
                    Lease
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
