import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto p-6 grid gap-6 md:grid-cols-2">
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">Simulator</h2>
        <p className="text-sm text-gray-600 mb-4">Kaltakquise, Bedarf, Abschluss. KI-Persona, Transkript, KPI.</p>
        <Link href="/simulator" className="inline-block bg-black text-white px-4 py-2 rounded-xl">Starten</Link>
      </section>
      <section className="bg-white p-6 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">Manager</h2>
        <p className="text-sm text-gray-600 mb-4">Scores, Stärken, Schwächen, CSV Export.</p>
        <Link href="/manager" className="inline-block bg-black text-white px-4 py-2 rounded-xl">Oeffnen</Link>
      </section>
    </main>
  );
}
