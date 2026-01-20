import React from 'react';
import { getAllCustomers } from '../../../../lib/admin-actions';

interface CustomerRecord {
  id: string;
  full_name: string;
  email: string;
  total_spent: number;
  total_bookings: number;
  last_booking: string;
}

export default async function CustomersPage() {
  // Chamada à Server Action para obter dados de LTV e histórico
  const customers = await getAllCustomers() as CustomerRecord[];

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4] font-sans">
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[#1A1A1A] tracking-tight">Módulo 04: Clientes & CRM</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Inteligência de Mercado e Lifetime Value (LTV)</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right border-r border-gray-100 pr-6">
            <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest leading-none">Base Total</p>
            <p className="text-lg font-bold text-black leading-tight">{customers.length}</p>
          </div>
          <button className="bg-black text-white px-5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gold-600 transition-all shadow-sm">
            Exportar CRM
          </button>
        </div>
      </header>

      <div className="p-10 space-y-6 overflow-y-auto flex-1">
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden text-sm">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100">
                <th className="px-8 py-4 italic text-[#D4AF37]">Membro VIP</th>
                <th className="px-6 py-4">Cliente / E-mail</th>
                <th className="px-6 py-4">Frequência</th>
                <th className="px-6 py-4">LTV (Gasto Total)</th>
                <th className="px-6 py-4">Última Atividade</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? customers.map((customer) => (
                <tr key={customer.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className={`w-2 h-2 rounded-full ${customer.total_spent > 500 ? 'bg-gold-500 shadow-[0_0_8px_#D4AF37]' : 'bg-gray-200'}`}></div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-gray-900 leading-none">{customer.full_name}</p>
                    <p className="text-[10px] text-blue-500 mt-1 font-medium">{customer.email}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-600 uppercase">
                      {customer.total_bookings} Reservas
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-black text-gray-900 tracking-tighter text-base">
                      €{Number(customer.total_spent || 0).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-gray-500 text-xs italic">
                    {customer.last_booking ? new Date(customer.last_booking).toLocaleDateString('pt-PT') : 'Sem registo'}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[10px] font-bold uppercase text-gray-400 hover:text-black tracking-widest transition-colors">
                      Perfil CRM
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="p-20 text-center text-gray-300 italic">
                    A aguardar sincronização de clientes com o ecossistema...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}