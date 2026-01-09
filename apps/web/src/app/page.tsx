import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-amber-500/30 font-sans">
      {/* HEADER */}
      <nav className="p-6 flex justify-between items-center border-b border-white/5 backdrop-blur-md sticky top-0 z-50 bg-black/50">
        <h1 className="text-lg font-bold tracking-[0.3em] text-white">
          CHEF ON DEMAND
        </h1>
        <button className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-500 text-[10px] uppercase tracking-widest font-bold">
          Chef Area
        </button>
      </nav>

      {/* HERO SECTION - REFINED & READABLE */}
      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center">
        
        <h2 className="text-5xl md:text-6xl font-light leading-tight max-w-4xl tracking-tight text-white">
          Curated <span className="font-serif italic text-amber-400">private dining</span>
        </h2>
        
        {/* TEXTO MAIS PERCEPTÍVEL E BOLD */}
        <p className="mt-8 text-zinc-300 max-w-2xl text-lg md:text-xl font-medium leading-relaxed tracking-wide">
          Professional Chefs for <span className="text-white">private homes, events and stays.</span>
        </p>

        {/* BARRA DE PESQUISA SLIM & LONG */}
        <div className="mt-14 w-full max-w-3xl bg-zinc-900/40 p-1.5 rounded-full border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center gap-1">
          <div className="flex-1 flex items-center px-6 w-full">
            <svg className="w-4 h-4 text-zinc-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="What's your taste today?" 
              className="w-full bg-transparent py-3 outline-none text-white text-sm placeholder:text-zinc-600 font-light"
            />
          </div>
          
          <div className="h-4 w-[1px] bg-white/10 hidden md:block mx-2"></div>

          <button className="bg-white text-black px-12 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-black hover:bg-amber-400 transition-all duration-700 w-full md:w-auto">
            Explore
          </button>
        </div>
      </section>

      {/* SEÇÃO DE CURADORIA */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h3 className="text-zinc-500 uppercase tracking-[0.5em] text-[9px] mb-3 font-bold">The Selection</h3>
          <h2 className="text-2xl font-light tracking-widest uppercase text-zinc-200">Elite Masters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-zinc-900/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-zinc-800 font-serif italic text-xl">Reserved</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-zinc-800 text-[8px] uppercase tracking-[0.5em]">
          Chef on Demand • Private Gastronomy Protocol
        </p>
      </footer>
    </main>
  );
}