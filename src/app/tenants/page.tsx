import { pool } from "../../../lib/db";
import TenantsClient from "./TenantsClient";

export default async function TenantsPage() {
  const [rows] = await pool.query<any[]>("SELECT * FROM tenants");
  return <TenantsClient tenants={rows} />;
}
