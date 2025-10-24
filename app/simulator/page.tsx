'use client';
import React, { useState } from "react";

type Msg = { id: string; role: "agent"|"ai"; text: string };

export default function Page(){
  const [scenario, setScenario] = useState("cold");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [running, setRunning] = useState(false);

  const start = ()=>{
    if(running) return;
    setMessages([{ id: crypto.randomUUID(), role:"ai", text: opener(scenario) }]);
    setRunning(true);
  };

  const stop = ()=> setRunning(false);

  const send = async ()=>{
    if(!running || !input.trim()) return;
    const user = { id: crypto.randomUUID(), role:"agent" as const, text: input.trim() };
    const next = [...messages, user];
    setMessages(next);
    setInput("");

    const payload = {
      scenario,
      messages: next.map(m => ({
        role: m.role === "agent" ? "user" : "assistant",
        content: m.text
      }))
    };

    try{
      const res = await fetch("/api/chat", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      const aiText = data.text || "Ok.";
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role:"ai", text: aiText }]);
    }catch{
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role:"ai", text:"Fehler bei der KI. Bitte erneut senden." }]);
    }
  };

  return (
    <main className="max-w-6xl mx-auto p-6 grid gap-4 md:grid-cols-3">
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">Szenario</h2>
        <select
          value={scenario}
          onChange={e=>{ setScenario(e.target.value); }}
          disabled={running}
          className="w-full border rounded p-2"
        >
          <option value="cold">Kaltakquise</option>
          <option value="discovery">Bedarfsanalyse</option>
          <option value="closing">Abschluss</option>
        </select>
        {!running
          ? <button onClick={start} className="mt-3 px-3 py-2 rounded-xl bg-green-600 text-white">Start</button>
          : <button onClick={stop} className="mt-3 px-3 py-2 rounded-xl bg-red-600 text-white">Stop</button>
        }
      </div>

      <div className="bg-white p-4 rounded-2xl shadow md:col-span-2 flex flex-col h-[70vh]">
        <div className="flex-1 overflow-auto space-y-3">
          {messages.map(m=>(
            <div key={m.id} className={m.role==='agent'?'ml-auto max-w-[85%]':''}>
              <div className={(m.role==='agent'?'bg-blue-600 text-white':'bg-gray-100') + ' rounded-2xl px-3 py-2'}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t flex gap-2">
          <input
            disabled={!running}
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter') send(); }}
            className="flex-1 border rounded p-2"
            placeholder={running?"Nachricht tippen und Enter":"Auf Start klicken"}
          />
          <button disabled={!running} onClick={send} className="px-3 py-2 rounded-xl bg-black text-white">Senden</button>
        </div>
      </div>
    </main>
  );
}

function opener(s: string){
  if(s==="cold") return "Guten Tag, hier Becker. Wer ist da? Ich habe nur kurz Zeit.";
  if(s==="discovery") return "Hallo, hier ist König. Womit starten wir?";
  return "Okay. Wir haben wenig Zeit. Was schlagen Sie konkret vor?";
}
