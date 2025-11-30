import { pool } from "../../../lib/db";

export default async function LeaseAgreementsPage() {
  const [rows] = await pool.query<any[]>("SELECT * FROM Lease_Agreements");

  return (
    <div className="bg-white shadow rounded-xl p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">📄 Lease Agreements</h1>

      {rows.length === 0 && <p>No lease agreements found.</p>}

      <table className="w-full border-collapse text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Property ID</th>
            <th className="border px-4 py-2">Tenant ID</th>
            <th className="border px-4 py-2">Agent ID</th>
            <th className="border px-4 py-2">Start Date</th>
            <th className="border px-4 py-2">End Date</th>
            <th className="border px-4 py-2">Rent</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((l) => (
            <tr key={l.id}>
              <td className="border px-4 py-2">{l.id}</td>
              <td className="border px-4 py-2">{l.property_id}</td>
              <td className="border px-4 py-2">{l.tenant_id}</td>
              <td className="border px-4 py-2">{l.agent_id}</td>
              <td className="border px-4 py-2">{new Date(l.start_date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(l.end_date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{l.monthly_rent}</td>
              <td className="border px-4 py-2">{l.lease_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
