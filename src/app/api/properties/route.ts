import { pool } from "../../../../lib/db";

export async function GET() {
  const [rows] = await pool.query(`
    SELECT p.*, o.name AS owner_name, a.name AS agent_name
    FROM Properties p
    JOIN Property_Owners o ON p.owner_id = o.id
    LEFT JOIN Agents a ON p.agent_id = a.id
  `);

  return Response.json(rows);
}
