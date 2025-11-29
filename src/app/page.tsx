export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Property Management System
        </h1>

        <p className="text-gray-600 mb-8">
          Manage properties, tenants, and rent payments — all in one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/properties"
            className="p-6 rounded-xl border hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg mb-2">🏠 Properties</h2>
            <p className="text-sm text-gray-600">View and manage properties.</p>
          </a>

          <a
            href="/tenants"
            className="p-6 rounded-xl border hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg mb-2">👨‍👩‍👧 Tenants</h2>
            <p className="text-sm text-gray-600">Add & manage tenant details.</p>
          </a>

          <a
            href="/payments"
            className="p-6 rounded-xl border hover:shadow-md transition"
          >
            <h2 className="font-semibold text-lg mb-2">💳 Payments</h2>
            <p className="text-sm text-gray-600">
              Track rent payments & history.
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
