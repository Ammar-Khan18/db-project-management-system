import { pool } from "../../../lib/db";
import PropertyOwnersClient from "./PropertyOwnersClient";

export default async function PropertyOwnersPage() {
  const [rows] = await pool.query<any[]>("SELECT * FROM property_owners");

  return <PropertyOwnersClient owners={rows} />;
}
