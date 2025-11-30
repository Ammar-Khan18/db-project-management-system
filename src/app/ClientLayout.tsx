// app/ClientLayout.tsx
"use client";

import React from "react";
import { UserProvider } from "./context/UserContext";
import Sidebar from "./components/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6">
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </UserProvider>
  );
}
