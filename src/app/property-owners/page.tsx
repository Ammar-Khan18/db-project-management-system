import { pool } from "../../../lib/db";

export default async function PropertyOwnersPage() {
  const [rows] = await pool.query<any[]>("SELECT * FROM Property_Owners");

  return (
    <div className="bg-white shadow rounded-xl p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">🏢 Property Owners</h1>

      {rows.length === 0 && <p>No property owners found.</p>}

      <table className="w-full border-collapse text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">CNIC</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">City</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => (
            <tr key={o.id}>
              <td className="border px-4 py-2">{o.id}</td>
              <td className="border px-4 py-2">{o.name}</td>
              <td className="border px-4 py-2">{o.cnic}</td>
              <td className="border px-4 py-2">{o.phone_no}</td>
              <td className="border px-4 py-2">{o.email}</td>
              <td className="border px-4 py-2">{o.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
