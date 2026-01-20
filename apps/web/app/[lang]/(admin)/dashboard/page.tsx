import React from 'react';
import { getDashboardStats, getLiveFeed } from '../../../../lib/admin-actions';

export default async function DashboardPage() {
  // Busca de dados paralela (Rigor de Performance)
  const [stats, feed] = await Promise.all([
    getDashboardStats(),
    getLiveFeed()
  ]);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F4F4F4]">
      {/* Header de Elite */}
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#111111]">Torre de Controlo Operacional</h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-bold mt-0.5">Live Intelligence System</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right border-r border-gray-100 pr-6">
            <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Faturação 24h</p>
            <p className="text-xs font-semibold text-green-600">
              €{Number(stats?.daily_revenue || 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>
          
          <span className="flex items-center gap-2 text-[10px] font-bold text-red-600 bg-red-50 px-4 py-2 rounded-full border border-red-100 uppercase tracking-wider">
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            {stats?.active_alerts || 0} Alertas Nível 2/3
          </span>
        </div>
      </header>

      <div className="p-8 grid grid-cols-12 gap-6 overflow-y-auto flex-1">
        {/* Radar de Procura */}
        <section className="col-span-12 xl:col-span-8 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Radar de Procura ({stats?.active_services || 0} ativos)
            </h2>
            <div className="flex gap-4">
               <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium font-sans">
                 <span className="w-2 h-2 bg-gold-500 rounded-full"></span> Procura Alta
               </div>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400 italic font-sans text-sm">
             Sincronizando coordenadas GPS em tempo real...
          </div>
        </section>

        {/* Governance Live Feed */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          <section className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 font-sans">Live Feed Governance</h2>
            <div className="space-y-4 font-sans">
              {feed && feed.length > 0 ? feed.map((item: any) => (
                <div key={item.id} className={`p-4 border-l-4 rounded-r-xl ${item.status === 'disputed' ? 'bg-red-50 border-red-600' : 'bg-green-50 border-green-500'}`}>
                  <p className="text-[9px] font-black uppercase tracking-tighter opacity-70">
                    {item.status === 'disputed' ? 'Nível 3 - CEO' : 'Nível 0 - Auto'}
                  </p>
                  <p className="text-sm font-medium text-gray-800">{item.client_name}</p>
                  <p className="text-[10px] text-gray-400 mt-1 italic">{item.chef_specialty}</p>
                </div>
              )) : <p className="text-xs italic text-gray-400">Sem atividade operacional.</p>}
            </div>
          </section>

          {/* AI Suggestion */}
          <section className="bg-[#111111] rounded-2xl p-8 shadow-xl text-white font-sans">
            <h2 className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4">AI Business Suggestion</h2>
            <p className="text-sm opacity-90 leading-relaxed italic">
              "Forte tendência de procura detectada para eventos privados na Quinta do Lago."
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}