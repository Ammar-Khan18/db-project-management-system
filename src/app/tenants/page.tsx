import { pool } from "../../../lib/db";

export default async function TenantsPage() {
  const [rows] = await pool.query<any[]>("SELECT * FROM Tenants");

  return (
    <div className="bg-white shadow rounded-xl p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">👨‍👩‍👧 Tenants</h1>

      {rows.length === 0 && <p>No tenants found.</p>}

      <table className="w-full border-collapse text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">CNIC</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.id}>
              <td className="border px-4 py-2">{t.id}</td>
              <td className="border px-4 py-2">{t.name}</td>
              <td className="border px-4 py-2">{t.cnic}</td>
              <td className="border px-4 py-2">{t.phone_no}</td>
              <td className="border px-4 py-2">{t.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
