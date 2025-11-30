import Link from "next/link";
import "./globals.css"; // TailwindCSS base
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Property Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100 text-black">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
          <h1 className="text-2xl font-bold mb-6 text-black">
            PMS Dashboard
          </h1>

          <nav className="flex flex-col gap-3">
            <Link
              href="/properties"
              className="px-3 py-2 rounded hover:bg-gray-200 transition text-black"
            >
              🏠 Properties
            </Link>

            <Link
              href="/tenants"
              className="px-3 py-2 rounded hover:bg-gray-200 transition text-black"
            >
              👨‍👩‍👧 Tenants
            </Link>

            <Link
              href="/payments"
              className="px-3 py-2 rounded hover:bg-gray-200 transition text-black"
            >
              💳 Payments
            </Link>

            <Link
              href="/lease-agreements"
              className="px-3 py-2 rounded hover:bg-gray-200 transition text-black"
            >
              📄 Lease Agreements
            </Link>

            <Link
              href="/agents"
              className="px-3 py-2 rounded hover:bg-gray-200 transition text-black"
            >
              🧑‍💼 Agents
            </Link>

            <Link
              href="/property-owners"
              className="px-3 py-2 rounded hover:bg-gray-200 transition text-black"
            >
              🏢 Property Owners
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10 text-black">{children}</main>
      </body>
    </html>
  );
}