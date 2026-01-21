// apps/web/app/[lang]/(admin)/event-management/page.tsx
import React from 'react';

export default function EventManagementPage() {
  return (
    <div className="flex flex-col h-full bg-[#F4F4F4] font-sans">
      <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[#111111] tracking-tight">Módulo 06: Cozinha de Produção — Eventos</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Bilheteira e Experiências de Grupo</p>
        </div>
      </header>
      
      <div className="p-10 flex-1">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-12 text-center text-gray-400 italic">
          <p className="text-sm font-medium">[Interface de Gestão de Inventário e Agendamento de Workshops Ativa]</p>
        </div>
      </div>
    </div>
  );
}