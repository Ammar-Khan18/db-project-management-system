// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Property Management System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-black">
        {/* ClientLayout handles interactive UI (use client) */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
