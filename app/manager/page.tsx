'use client';
export default function Page(){
  const sessions = (typeof window !== "undefined") ? JSON.parse(localStorage.getItem("ai-call-coach-sessions") || "[]") : [];
  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow p-4">
        <h1 className="text-xl font-semibold mb-2">Manager Ansicht</h1>
        <p className="text-sm text-gray-600">Demoansicht. Export folgt.</p>
        <pre className="text-xs bg-gray-50 p-3 rounded mt-3">{JSON.stringify(sessions.slice(-3), null, 2)}</pre>
      </div>
    </main>
  );
}
