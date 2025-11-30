import { pool } from "../../../lib/db";

export default async function AgentsPage() {
  const [rows] = await pool.query<any[]>("SELECT * FROM Agents");

  return (
    <div className="bg-white shadow rounded-xl p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">🧑‍💼 Agents</h1>

      {rows.length === 0 && <p>No agents found.</p>}

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
          {rows.map((a) => (
            <tr key={a.id}>
              <td className="border px-4 py-2">{a.id}</td>
              <td className="border px-4 py-2">{a.name}</td>
              <td className="border px-4 py-2">{a.cnic}</td>
              <td className="border px-4 py-2">{a.phone_no}</td>
              <td className="border px-4 py-2">{a.email}</td>
              <td className="border px-4 py-2">{a.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
