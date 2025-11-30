import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 text-black">
        
        <h1 className="text-3xl font-bold mb-4">
          Property Management System
        </h1>

        <p className="mb-8">
          Manage properties, tenants, and rent payments — all in one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Properties */}
          <Link
            href="/properties"
            className="p-6 rounded-xl border hover:shadow-md transition block"
          >
            <h2 className="font-semibold text-lg mb-2">🏠 Properties</h2>
            <p className="text-sm">View and manage properties.</p>
          </Link>

          {/* Tenants */}
          <Link
            href="/tenants"
            className="p-6 rounded-xl border hover:shadow-md transition block"
          >
            <h2 className="font-semibold text-lg mb-2">👨‍👩‍👧 Tenants</h2>
            <p className="text-sm">Add & manage tenant details.</p>
          </Link>

          {/* Payments */}
          <Link
            href="/payments"
            className="p-6 rounded-xl border hover:shadow-md transition block"
          >
            <h2 className="font-semibold text-lg mb-2">💳 Payments</h2>
            <p className="text-sm">
              Track rent payments & history.
            </p>
          </Link>

        </div>

      </div>
    </main>
  );
}
