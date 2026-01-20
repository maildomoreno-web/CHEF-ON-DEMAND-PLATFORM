import React from 'react';
import { getFinancialRecords } from '../../../../lib/admin-actions';

// Interface rigorosa para eliminar avisos do VS Code
interface FinancialRecord {
  id: string;
  gross_amount: number;
  chef_payout: number;
  platform_fee: number;
  payment_status: string;
  client_name: string;
}

export default async function FinancePage() {
  // Casting explícito para garantir que o compilador saiba o que está a receber
  const rawData = await getFinancialRecords();
  const records = (rawData || []) as FinancialRecord[];

  // Cálculos dinâmicos com proteção contra valores nulos
  const totalRevenue = records.reduce((acc, curr) => acc + (curr.gross_amount || 0), 0);
  const totalNetProfit = records.reduce((acc, curr) => acc + (curr.platform_fee || 0), 0);
  const pendingPayouts = records
    .filter((r) => r.payment_status !== 'paid')
    .reduce((acc, curr) => acc + (curr.chef_payout || 0), 0);
  
  const averageTicket = records.length > 0 ? totalRevenue / records.length : 0;

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4] font-sans">
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[#1A1A1A] tracking-tight">Módulo 08: Gestão Financeira</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 font-sans">Lucro, Margens e Fluxo de Caixa</p>
        </div>
        <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100">
          <p className="text-[9px] text-green-700 font-bold uppercase italic font-sans">Margem Atual</p>
          <p className="text-sm font-bold text-green-800">20.0%</p>
        </div>
      </header>

      <div className="p-10 space-y-8 overflow-y-auto flex-1 font-sans">
        
        {/* Cartões de Performance */}
        <section className="grid grid-cols-4 gap-6">
          {[
            { label: 'Faturação Total', value: `€${totalRevenue.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`, color: 'text-black' },
            { label: 'Lucro Líquido (Fees)', value: `€${totalNetProfit.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`, color: 'text-[#D4AF37]' },
            { label: 'Payouts a Processar', value: `€${pendingPayouts.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}`, color: 'text-gray-600' },
            { label: 'Ticket Médio', value: `€${averageTicket.toLocaleString('pt-PT', { maximumFractionDigits: 0 })}`, color: 'text-black' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 tracking-wider">{stat.label}</p>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Tabela de Transações Dinâmica */}
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Últimas Transações & Split de Comissão</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                <th className="px-8 py-4">ID / Cliente</th>
                <th className="px-6 py-4">Total Bruto</th>
                <th className="px-6 py-4 text-blue-600 font-sans">Chef (80%)</th>
                <th className="px-6 py-4 text-[#D4AF37] font-sans">Fee Plataforma (20%)</th>
                <th className="px-6 py-4 font-sans">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {records.map((row) => (
                <tr key={row.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-semibold text-gray-900">#RES-{row.id.substring(0,4).toUpperCase()}</p>
                    <p className="text-xs text-gray-400 font-sans">{row.client_name}</p>
                  </td>
                  <td className="px-6 py-5 font-medium font-sans">€{row.gross_amount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-5 text-gray-500 font-sans">€{row.chef_payout.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-5 font-bold text-[#D4AF37] font-sans">€{row.platform_fee.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 text-[9px] font-bold rounded uppercase font-sans ${
                      row.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {row.payment_status === 'paid' ? 'Liquidado' : 'Pendente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {records.length === 0 && (
            <div className="p-20 text-center text-gray-400 italic font-sans text-sm">A aguardar transações no Neon...</div>
          )}
        </section>
      </div>
    </div>
  );
}