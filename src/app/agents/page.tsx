import { pool } from "../../../lib/db";
import AgentsClient from "./AgentsClient";

export default async function AgentsPage() {
  const [rows] = await pool.query<any[]>("SELECT * FROM agents");
  return <AgentsClient agents={rows} />;
}
