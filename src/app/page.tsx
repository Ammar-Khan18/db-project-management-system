"use client";
import Link from "next/link";


export default function Home() {
return (
<main className="flex flex-col items-center justify-center min-h-screen gap-4">
<h1 className="text-3xl font-bold">Welcome</h1>
<Link href="/login" className="text-blue-500 underline">Login</Link>
<Link href="/register" className="text-blue-500 underline">Register</Link>
</main>
);
}