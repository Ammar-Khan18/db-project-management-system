import AgentsClient from "./AgentsClient";

export default async function AgentsPage() {
  const res = await fetch("http://localhost:3000/api/agents", {
    cache: "no-store",
  });

  const agents = await res.json(); // This will be an array

  return <AgentsClient agents={agents} />;
}
