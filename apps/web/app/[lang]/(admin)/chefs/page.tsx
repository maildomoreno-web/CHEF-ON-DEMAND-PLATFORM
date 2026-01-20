import React from 'react';

export default function ChefsPage() {
  return (
    <div className="p-10 bg-[#F4F4F4] h-full">
      <header className="mb-8">
        <h1 className="text-xl font-semibold text-[#111111]">Módulo 03: Gestão de Chefs</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Vetting, Performance e Rankings</p>
      </header>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase mb-4">Chef de Destaque</p>
          <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center italic text-gray-300">Foto / Bio</div>
        </div>
        <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-gray-400 italic">
          [Lista de Documentação Legal e Score de Higiene]
        </div>
      </div>
    </div>
  );
}