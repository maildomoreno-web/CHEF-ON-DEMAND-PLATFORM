import React from 'react';
import { getAllBookings } from '../../../../lib/admin-actions';

// Interface rigorosa para tipagem de reservas
interface BookingRecord {
  id: string;
  client_name: string;
  chef_name: string;
  event_date: string;
  total_amount: number;
  status: string;
}

export default async function BookingsPage() {
  // Chamada à Server Action para buscar dados globais
  const bookings = await getAllBookings() as BookingRecord[];

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4] font-sans">
      {/* Header Operacional */}
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[#1A1A1A] tracking-tight">Módulo 02: Gestão de Reservas</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Controlo Global de Fluxo de Serviços</p>
        </div>
        <div className="flex items-center gap-4 text-right">
          <div className="border-r border-gray-100 pr-4">
            <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Total Ativas</p>
            <p className="text-sm font-bold text-black">{bookings.length}</p>
          </div>
          <button className="bg-white border border-gray-200 text-black px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
            Filtros Avançados
          </button>
        </div>
      </header>

      <div className="p-10 space-y-6 overflow-y-auto flex-1 font-sans">
        {/* Listagem de Reservas */}
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden text-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100">
                <th className="px-8 py-4">Status de Serviço</th>
                <th className="px-6 py-4">Agendamento</th>
                <th className="px-6 py-4">Intervenientes (Cliente/Chef)</th>
                <th className="px-6 py-4">Faturação Bruta</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <span className={`px-2 py-1 text-[9px] font-black rounded uppercase tracking-tighter border ${
                      booking.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-100' :
                      booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                      booking.status === 'disputed' ? 'bg-red-50 text-red-700 border-red-100' :
                      'bg-gray-50 text-gray-500 border-gray-100'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-gray-900 tracking-tight">
                      {new Date(booking.event_date).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {new Date(booking.event_date).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-semibold">{booking.client_name}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Chef: {booking.chef_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-gray-900 tracking-tighter">
                      €{Number(booking.total_amount).toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[10px] font-bold uppercase text-gray-400 hover:text-black tracking-widest transition-colors">
                      Ver Ficha
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                    <p className="text-gray-300 italic font-sans text-sm">Nenhum fluxo de reserva ativo no sistema Neon.</p>
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