import React from 'react';
import { getAllChefs } from '../../../../lib/admin-actions';

interface ChefRecord {
  id: string;
  full_name: string;
  email: string;
  specialty: string;
  is_verified: boolean;
  created_at: string;
}

export default async function ChefsPage() {
  // Chamada à Server Action para buscar dados reais do Neon
  const chefs = await getAllChefs() as ChefRecord[];

  return (
    <div className="flex flex-col h-full bg-[#F4F4F4] font-sans">
      {/* Header de Gestão de Talentos */}
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[#1A1A1A] tracking-tight">Módulo 01: Gestão de Chefs</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Vetting, Performance e Rankings</p>
        </div>
        <button className="bg-[#111111] text-white px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-gold-600 transition-all shadow-sm">
          Convidar Novo Chef
        </button>
      </header>

      <div className="p-10 space-y-6 overflow-y-auto flex-1">
        {/* Tabela de Profissionais */}
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden text-sm">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Diretório de Profissionais Ativos</h3>
            <span className="text-[9px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold uppercase italic">Real-time Sync</span>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500 font-bold border-b border-gray-100">
                <th className="px-8 py-4 italic text-[#D4AF37]">Status</th>
                <th className="px-6 py-4">Nome Profissional</th>
                <th className="px-6 py-4">Especialidade</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {chefs.length > 0 ? chefs.map((chef) => (
                <tr key={chef.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 text-[9px] font-black rounded-full uppercase tracking-tighter ${
                      chef.is_verified 
                      ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                      : 'bg-orange-50 text-orange-700 border border-orange-100'
                    }`}>
                      {chef.is_verified ? 'Verificado' : 'Pendente'}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-bold text-gray-900">{chef.full_name}</p>
                    <p className="text-[10px] text-gray-400">Registado em {new Date(chef.created_at).toLocaleDateString('pt-PT')}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-gray-600 font-medium uppercase text-[10px] tracking-wide bg-gray-100 px-2 py-0.5 rounded">
                      {chef.specialty}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-gray-500 font-medium">
                    {chef.email}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-[10px] font-bold uppercase text-gray-400 hover:text-black tracking-widest transition-colors">
                      Gerir Perfil
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-gray-300 italic font-sans text-sm font-medium italic">Nenhum chef registado no ecossistema.</p>
                      <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em]">Check database connection: Neon</p>
                    </div>
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