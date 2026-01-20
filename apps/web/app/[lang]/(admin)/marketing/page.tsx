import React from 'react';

export default function MarketingPage() {
  return (
    <div className="p-10 bg-[#F4F4F4] h-full">
      <header className="mb-8">
        <h1 className="text-xl font-semibold text-[#111111]">Módulo 05: Marketing & SEO</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Campanhas e Automação de Conteúdo</p>
      </header>
      <div className="bg-[#111111] text-white p-8 rounded-2xl shadow-xl">
        <p className="text-gold-500 font-bold text-xs uppercase tracking-widest mb-2">IA Marketing Tool</p>
        <p className="text-sm opacity-80 italic">O gerador de artigos para SEO está pronto para processar as keywords do mês.</p>
      </div>
    </div>
  );
}