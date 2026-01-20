import React from 'react';
import Image from 'next/image';

interface HeroProps {
  lang: string;
  dict: {
    searchPlaceholder: string;
    searchBtn: string;
  };
}

export default function Hero({ lang, dict }: HeroProps) {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background com Image Optimization do Next.js */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600" 
          fill
          priority
          className="object-cover opacity-40"
          alt="Chef Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        {/* Tag de Marca: Source Sans 3 Semibold */}
        <span className="font-source-sans text-[13px] font-semibold uppercase tracking-[0.5em] text-gold mb-8 block">
          Chef on Demand
        </span>

        {/* H1: Cormorant Garamond SemiBold - Fixo em Inglês conforme solicitado */}
        <h1 className="font-cormorant text-[42px] md:text-[82px] font-semibold text-white tracking-[0.02em] leading-[1.1] mb-6">
          Curated <span className="text-gold italic font-medium">Private Dining</span>
        </h1>

        {/* Subheadline: Source Sans 3 Semibold */}
        <p className="font-source-sans text-[14px] md:text-[18px] font-semibold text-zinc-300 uppercase tracking-[0.2em] mb-14 max-w-3xl mx-auto leading-[1.4]">
          Professional chefs for private homes, events and stays.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto group">
          <div className="flex flex-col md:flex-row items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 md:pl-8 focus-within:border-gold/30 transition-all duration-300">
            <input 
              type="text" 
              placeholder={dict.searchPlaceholder}
              className="font-source-sans bg-transparent border-none outline-none text-white text-[15px] w-full placeholder:text-zinc-500 focus:ring-0 py-4 md:py-0"
            />
            <button className="w-full md:w-auto font-source-sans bg-gold hover:bg-white text-black px-10 py-3.5 rounded-full text-[11px] font-semibold uppercase tracking-widest transition-all">
              {dict.searchBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}