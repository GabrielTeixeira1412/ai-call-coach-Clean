'use client';
import React, { useState } from "react";

const objections = ["zu teuer","kein bedarf","keine zeit","schon lieferant","kein interesse","später","budget","entscheidung","chef","daten schicken"];
const closingSignals = ["klingt gut","interessant","wie geht es weiter","angebot","termin","demo","schicken","email","preis","vertrag","start"];
const discoveryKeywords = ["bedarf","ziel","problem","herausforderung","prozess","status quo","volumen","entscheidung","zeitrahmen","kriterien","stakeholder"];
const valueKeywords = ["nutzen","vorteil","roi","zeit sparen","kosten senken","umsatz","effizienz","qualität","risiko","sicherheit"];

const SCENARIOS:any = {
  cold: { id:"cold", title:"Kaltakquise", opener:"Guten Tag, hier Becker. Wer ist da? Ich habe nur kurz Zeit." },
  discovery: { id:"discovery", title:"Bedarfsanalyse", opener:"Hallo, hier ist König. Womit starten wir?" },
  closing: { id:"closing", title:"Abschluss", opener:"Okay. Wir haben wenig Zeit. Was schlagen Sie konkret vor?" }
};

function aiReply(scenario:string, msg:string, turns:any[]){
  const m = (msg||"").toLowerCase();
  if(turns.length===0) return SCENARIOS[scenario].opener;
  const hasObjection = objections.some(k=>m.includes(k));
  const hasClose = closingSignals.some(k=>m.includes(k));
  const asksDiscovery = discoveryKeywords.some(k=>m.includes(k));
  const talksValue = valueKeywords.some(k=>m.includes(k));
  if(scenario==="cold"){
    if(hasObjection) return "Verstehe. Was müsste gegeben sein, damit sich ein 10-Minuten-Termin lohnt?";
    if(asksDiscovery) return "Wo liegen Ihre größten Engpässe aktuell?";
    if(talksValue) return "Wenn wir 20 Prozent Zeit sparen, wäre das interessant?";
    return "Ich habe wenig Zeit. Ein Satz zum konkreten Nutzen?";
  }
  if(scenario==="discovery"){
    if(asksDiscovery) return "Welche KPI ist für Sie kritisch: FCR, AHT oder Erreichbarkeit?";
    if(hasObjection) return "Welche Bedingung fehlt für den nächsten Schritt?";
    if(talksValue) return "15 Prozent FCR-Plus in 8 Wochen. Welche Risiken sehen Sie?";
    return "Skizzieren Sie Ihren aktuellen Prozess in drei Schritten?";
  }
  if(scenario==="closing"){
    if(hasClose) return "Variante A Pilot 4 Wochen, B 3 Monate. Welche bevorzugen Sie?";
    if(hasObjection) return "Hält Budget, Timing oder Sicherheit ab?";
    if(talksValue) return "Dann Option A festhalten und Start am 01.?";
    return "Ich schlage einen Pilot mit klaren KPIs vor. Start in 2 Wochen ok?";
  }
  return "Wie gehen wir den nächsten Schritt?";
}

export default function Page(){
  const [scenario, setScenario] = useState("cold");
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const start = ()=> setMessages([{ id: crypto.randomUUID(), role: "ai", text: aiReply(scenario, "", []) }]);
  const send = ()=>{
    if(!input.trim()) return;
    const next = [...messages, { id: crypto.randomUUID(), role: "agent", text: input.trim() }];
    const ai = { id: crypto.randomUUID(), role: "ai", text: aiReply(scenario, input.trim(), next) };
    setMessages([...next, ai]);
    setInput("");
  };

  return (
    <main className="max-w-6xl mx-auto p-6 grid gap-4 md:grid-cols-3">
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="font-semibold mb-2">Szenario</h2>
        <select value={scenario} onChange={e=>setScenario(e.target.value)} className="w-full border rounded p-2">
          <option value="cold">Kaltakquise</option>
          <option value="discovery">Bedarfsanalyse</option>
          <option value="closing">Abschluss</option>
        </select>
        <button onClick={start} className="mt-3 px-3 py-2 rounded-xl bg-green-600 text-white">Start</button>
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
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') send(); }} className="flex-1 border rounded p-2" placeholder="Nachricht tippen und Enter" />
          <button onClick={send} className="px-3 py-2 rounded-xl bg-black text-white">Senden</button>
        </div>
      </div>
    </main>
  );
}
