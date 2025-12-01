"use client";
import { useState } from "react";


export default function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [msg, setMsg] = useState<string | null>(null);


async function handleLogin(e: React.FormEvent) {
e.preventDefault();
const res = await fetch("/api/login", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ email, password }),
});


const data = await res.json();
setMsg(data.message || (data.success ? "Login successful" : "Invalid login"));
}


return (
<main className="min-h-screen flex items-center justify-center">
<form onSubmit={handleLogin} className="flex flex-col gap-4 p-6 border rounded w-80">
<h1 className="text-2xl font-bold">Login</h1>


<input
type="email"
placeholder="Email"
className="border p-2"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>


<input
type="password"
placeholder="Password"
className="border p-2"
value={password}
onChange={(e) => setPassword(e.target.value)}
/>


<button type="submit" className="bg-blue-600 text-white p-2 rounded">
Login
</button>


{msg && <p>{msg}</p>}
</form>
</main>
);
}