import React from 'react';
import { getDisputedBookings } from '../../../../lib/admin-actions';

interface DisputedBooking {
  id: string;
  total_amount: number;
  status: string;
  client_name: string;
  client_email: string;
  chef_specialty: string;
  created_at: string;
}

export default async function QualityPage() {
  const disputes = await getDisputedBookings() as DisputedBooking[];

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4] font-sans">
      {/* Header de Governança e Auditoria */}
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[#1A1A1A] tracking-tight">Módulo 07: Qualidade & Incidentes</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 font-sans">Gestão de Provas e Caixa Preta</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-red-50 px-4 py-2 rounded-lg border border-red-100 flex flex-col justify-center">
            <p className="text-[8px] text-red-600 font-black uppercase tracking-tighter leading-none">Alertas Ativos</p>
            <p className="text-lg font-bold text-red-800 leading-none">{disputes.length}</p>
          </div>
        </div>
      </header>

      <div className="p-10 space-y-8 overflow-y-auto flex-1">
        
        {/* Painel de Disputas Reais do Neon */}
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden font-sans">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 font-sans">Fila de Mediação em Tempo Real</h3>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b border-gray-100">
                <th className="px-8 py-4">ID / Data</th>
                <th className="px-6 py-4">Cliente / Contacto</th>
                <th className="px-6 py-4">Chef / Especialidade</th>
                <th className="px-6 py-4">Valor em Risco</th>
                <th className="px-6 py-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {disputes.length > 0 ? disputes.map((row) => (
                <tr key={row.id} className="border-t border-gray-50 hover:bg-red-50/20 transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-bold text-gray-900 tracking-tighter">#DISP-{row.id.substring(0,4).toUpperCase()}</p>
                    <p className="text-[10px] text-gray-400 font-sans">{new Date(row.created_at).toLocaleDateString('pt-PT')}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-semibold text-gray-900 font-sans">{row.client_name}</p>
                    <p className="text-[10px] text-blue-500 font-sans">{row.client_email}</p>
                  </td>
                  <td className="px-6 py-5 font-sans italic text-gray-600">
                    {row.chef_specialty}
                  </td>
                  <td className="px-6 py-5">
                    <span className="font-bold text-red-600 font-sans">€{Number(row.total_amount).toLocaleString('pt-PT')}</span>
                  </td>
                  <td className="px-6 py-5 text-right font-sans">
                    <button className="bg-black text-white px-4 py-1.5 rounded text-[9px] font-black uppercase tracking-widest hover:bg-red-700 transition-all">
                      Abrir Caixa Preta
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center font-sans">
                    <div className="flex flex-col items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                      <p className="text-gray-400 italic text-sm font-medium">Nenhum incidente crítico detetado pela IA ou Clientes.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Info de Protocolo (Mantendo a tua estrutura de IA) */}
        <section className="grid grid-cols-3 gap-6 font-sans">
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Protocolo de Resolução de Disputas (SLA: 2h)</h4>
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 font-medium">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full"></span> Análise de Fotos Check-in/out
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full"></span> Verificação de Logs de GPS
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full"></span> Mediação Chat Interno
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-black rounded-full"></span> Decisão Final de Payout
              </p>
            </div>
          </div>
          <div className="p-6 bg-red-600 rounded-2xl text-white shadow-lg flex flex-col justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 font-sans">Atenção Admin</p>
            <p className="text-sm font-bold leading-tight font-sans italic">"A reputação da plataforma depende da justiça de cada resolução."</p>
            <p className="text-[10px] font-sans">CEO Chef on Demand</p>
          </div>
        </section>

      </div>
    </div>
  );
}