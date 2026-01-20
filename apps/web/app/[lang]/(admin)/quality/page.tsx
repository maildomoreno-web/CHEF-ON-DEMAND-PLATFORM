import React from 'react';

export default function QualityPage() {
  // Simulação de um Incidente Crítico vindo da IA (Caixa Preta)
  const incidentData = {
    id: "INC-9821",
    chef: "André Santos",
    client: "Família Cavalcanti",
    location: "Quinta do Lago, Algarve",
    timestamp: "20 Jan 2026, 14:30",
    status: "Em Disputa",
    aiAudit: "Diferença visual detetada na zona da bancada (88% confiança)."
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4]">
      {/* Header de Auditoria */}
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[#1A1A1A] tracking-tight">Módulo 07: Qualidade & Incidentes</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Gestão de Provas e Caixa Preta</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all">
            EXPORTAR RELATÓRIO PDF
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-lg text-xs font-bold hover:bg-black/90 transition-all">
            RESOLVER DISPUTA
          </button>
        </div>
      </header>

      <div className="p-10 space-y-8 overflow-y-auto flex-1">
        
        {/* Card de Detalhe do Incidente */}
        <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">ID Incidente</p>
              <p className="text-sm font-semibold">{incidentData.id}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Chef / Localização</p>
              <p className="text-sm font-semibold">{incidentData.chef}</p>
              <p className="text-xs text-gray-500">{incidentData.location}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Estado IA</p>
              <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-100 font-bold uppercase">
                {incidentData.status}
              </span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-[9px] text-red-600 font-bold uppercase mb-1 italic">Análise de IA</p>
              <p className="text-xs leading-relaxed text-gray-700 font-medium">{incidentData.aiAudit}</p>
            </div>
          </div>
        </section>

        {/* Visualizador de Caixa Preta (Antes vs Depois) */}
        <section className="grid grid-cols-2 gap-8">
          {/* Foto de Entrada (Check-in) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span> Foto de Entrada (Check-in)
            </h3>
            <div className="aspect-video bg-gray-200 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-gray-400 relative overflow-hidden italic">
              [Simulação: Foto da Cozinha Impecável na Chegada]
              <div className="absolute bottom-4 left-4 bg-black/50 text-white text-[9px] px-2 py-1 rounded">
                GPS: 37.0583° N, 8.0242° W | 12:05:04
              </div>
            </div>
          </div>

          {/* Foto de Saída (Check-out) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span> Foto de Saída (Check-out)
            </h3>
            <div className="aspect-video bg-gray-200 rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-gray-400 relative overflow-hidden italic">
              [Simulação: Foto da Saída com Destaque de IA em possível anomalia]
              <div className="absolute top-4 right-4 bg-red-600 text-white text-[9px] px-2 py-1 rounded font-bold">
                DIFERENÇA DETETADA
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 text-white text-[9px] px-2 py-1 rounded">
                GPS: 37.0583° N, 8.0242° W | 16:45:12
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}