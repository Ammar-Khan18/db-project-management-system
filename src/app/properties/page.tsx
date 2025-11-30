import { pool } from "../../../lib/db"; // Adjust path if needed

export default async function PropertiesPage() {
  try {
    // Fetch properties from MySQL
    const [rows] = await pool.query<any[]>("SELECT * FROM Properties");

    return (
      <main className="min-h-screen bg-gray-100 text-black p-10">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-6">🏠 All Properties</h1>

          {rows.length === 0 && (
            <p className="text-gray-600">No properties found.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rows.map((p) => (
              <div
                key={p.id}
                className="border rounded-xl p-5 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold mb-1">
                  {p.property_type} in {p.city}
                </h2>
                <p className="text-gray-700 mb-1">{p.address}</p>
                <p className="text-gray-700">Rooms: {p.rooms}</p>
                <p className="text-gray-700">Size: {p.size_sqft} sqft</p>
                <p className="text-gray-900 font-bold mt-2">
                  Rent: Rs {p.monthly_rent}
                </p>
                {p.description && (
                  <p className="text-gray-600 mt-1">{p.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching properties:", error);
    return (
      <main className="min-h-screen bg-gray-100 text-black p-10">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-6">🏠 All Properties</h1>
          <p className="text-red-600">
            Error fetching properties. Check server console for details.
          </p>
        </div>
      </main>
    );
  }
}
