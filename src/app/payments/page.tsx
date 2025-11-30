import { pool } from "../../../lib/db";

export default async function PaymentsPage() {
  const [rows] = await pool.query<any[]>("SELECT * FROM Payment");

  return (
    <div className="bg-white shadow rounded-xl p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">💳 Payments</h1>

      {rows.length === 0 && <p>No payments found.</p>}

      <table className="w-full border-collapse text-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Tenant ID</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2">{p.tenant_id}</td>
              <td className="border px-4 py-2">{p.amount}</td>
              <td className="border px-4 py-2">{p.payment_type}</td>
              <td className="border px-4 py-2">{p.payment_status}</td>
              <td className="border px-4 py-2">{new Date(p.payment_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
