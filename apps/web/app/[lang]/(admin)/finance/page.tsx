import React from 'react';

export default function FinancePage() {
  // Simulação de Métricas Reais vindas da IA Business & Profit
  const financeMetrics = {
    totalRevenue: "€42.850,00",
    netProfit: "€8.570,00", // 20% Margem Média
    pendingPayouts: "€12.400,00",
    averageTicket: "€485,00"
  };

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4]">
      {/* Header Financeiro */}
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[#1A1A1A] tracking-tight">Módulo 08: Gestão Financeira</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Lucro, Margens e Fluxo de Caixa</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100">
            <p className="text-[9px] text-green-700 font-bold uppercase italic">Margem Atual</p>
            <p className="text-sm font-bold text-green-800">21.4%</p>
          </div>
        </div>
      </header>

      <div className="p-10 space-y-8 overflow-y-auto flex-1">
        
        {/* Cartões de Performance (Kpis de Elite) */}
        <section className="grid grid-cols-4 gap-6">
          {[
            { label: 'Faturação Total', value: financeMetrics.totalRevenue, trend: '+12%', color: 'text-black' },
            { label: 'Lucro Líquido (Fees)', value: financeMetrics.netProfit, trend: '+8.5%', color: 'text-gold-600' },
            { label: 'Payouts a Processar', value: financeMetrics.pendingPayouts, trend: '6 Chefs', color: 'text-gray-600' },
            { label: 'Ticket Médio', value: financeMetrics.averageTicket, trend: '+45€', color: 'text-black' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 tracking-wider">{stat.label}</p>
              <div className="flex justify-between items-end">
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">{stat.trend}</span>
              </div>
            </div>
          ))}
        </section>

        {/* Tabela de Transações e Split de Pagamento */}
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Últimas Transações & Split de Comissão</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                <th className="px-8 py-4">ID / Cliente</th>
                <th className="px-6 py-4">Total Bruto</th>
                <th className="px-6 py-4 text-blue-600">Chef (80%)</th>
                <th className="px-6 py-4 text-gold-600">Fee Plataforma (20%)</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-8 py-5">
                  <p className="font-semibold text-gray-900">#RES-7721</p>
                  <p className="text-xs text-gray-400">Ana Martins (Lisboa)</p>
                </td>
                <td className="px-6 py-5 font-medium">€650,00</td>
                <td className="px-6 py-5 text-gray-500">€520,00</td>
                <td className="px-6 py-5 font-bold text-gold-700">€130,00</td>
                <td className="px-6 py-5">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-[9px] font-bold rounded uppercase">Liquidado</span>
                </td>
              </tr>
              {/* Mais linhas seriam injetadas aqui pela base de dados */}
            </tbody>
          </table>
        </section>

      </div>
    </div>
  );
}