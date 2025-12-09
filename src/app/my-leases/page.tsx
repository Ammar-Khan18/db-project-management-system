"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyLeases() {
  const [leases, setLeases] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/my-leases");
      const json = await res.json();
      if (!json.success) {
        if (res.status === 401) router.push("/login");
        return;
      }
      setLeases(json.data || []);
    }
    load();
  }, [router]);

  const removeLease = async (lease: { id: number }) => {
    try {
      const res = await fetch("/api/remove-lease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lease_id: lease.id }),
      });

      const json = await res.json();
      alert(json.message);

      if (json.success) {
        setLeases((prev) => prev.filter((l) => l.id !== lease.id));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to remove lease");
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Leases</h1>
        <button
          onClick={() => router.push("/browse-properties")}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Browse Properties
        </button>
      </div>

      {/* Lease List */}
      {leases.length === 0 ? (
        <p className="text-gray-600">You have no active leases.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leases.map((l) => (
            <div
              key={l.id}
              className="border rounded-lg shadow bg-white hover:shadow-lg transition p-4 flex flex-col justify-between"
            >
              {/* Property Info */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {l.property_type} — {l.property_address}, {l.property_city}
                </h2>
                <p className="text-sm text-gray-500 mt-1">Lease #{l.id}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <button
                  onClick={() => removeLease(l)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove Lease
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
