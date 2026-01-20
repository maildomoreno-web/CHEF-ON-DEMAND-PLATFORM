import React from 'react';
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { getDictionary } from '../../../lib/get-dictionary';

interface PageProps {
  params: Promise<{ lang: string }>;
}

interface ExclusiveEventsDict {
  tag: string;
  title: string;
  intro: string;
  categories: {
    popup: string;
    workshop: string;
    masterclass: string;
    tasting: string;
    mixology: string;
  };
  status: {
    open: string;
    lastSeats: string;
    soldOut: string;
  };
  labels: {
    reserve: string;
    discover: string;
    perPerson: string;
  };
}

export default async function EventsPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  const e = dict.exclusiveEvents as ExclusiveEventsDict;

  const experiences = [
    { id: 1, type: 'workshop', title: 'A Arte da Massa Fresca', date: '22 FEV', price: '85', status: 'open' },
    { id: 2, type: 'tasting', title: 'Vinhos Raros & Queijos de Autor', date: '28 FEV', price: '65', status: 'lastSeats' },
    { id: 3, type: 'popup', title: 'Jantar no Atelier: Sal e Fogo', date: '02 MAR', price: '120', status: 'open' },
    { id: 4, type: 'masterclass', title: 'Pastelaria Fina Francesa', date: '10 MAR', price: '140', status: 'open' },
    { id: 5, type: 'mixology', title: 'Cocktails de Assinatura', date: '15 MAR', price: '55', status: 'soldOut' },
    { id: 6, type: 'workshop', title: 'Cozinha Vegetariana de Autor', date: '20 MAR', price: '75', status: 'open' },
  ];

  return (
    <main className="flex flex-col bg-black min-h-screen">
      <Navbar lang={lang} dict={dict.nav} />

      <section className="relative pt-48 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="font-source-sans text-[12px] font-semibold uppercase tracking-[0.5em] text-gold mb-8 block">
            {e.tag}
          </span>
          <h1 className="font-cormorant text-[42px] md:text-[56px] font-semibold text-white tracking-[0.01em] leading-tight mb-10">
            {e.title}
          </h1>
          <p className="font-cormorant text-[22px] md:text-[28px] text-zinc-400 leading-relaxed italic max-w-2xl border-l border-gold/30 pl-8">
            {e.intro}
          </p>
        </div>
      </section>

      <section className="px-6 mb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
          {Object.entries(e.categories).map(([key, value]) => (
            <button 
              key={key}
              className="whitespace-nowrap px-6 py-2 border border-white/10 rounded-full font-source-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 hover:text-gold hover:border-gold/40 transition-all active:scale-95"
            >
              {value}
            </button>
          ))}
        </div>
      </section>

      <section className="py-10 px-6 mb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {experiences.map((exp) => (
            <div key={exp.id} className="group flex flex-col bg-zinc-950/30 border border-white/5 hover:border-gold/20 transition-all duration-500">
              <div className="aspect-[4/5] bg-zinc-900 relative overflow-hidden">
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-black/80 backdrop-blur-md px-3 py-1 font-source-sans text-[10px] font-bold text-gold uppercase tracking-[0.2em] border border-gold/20">
                    {e.categories[exp.type as keyof typeof e.categories]}
                  </span>
                </div>
                
                {exp.status !== 'open' && (
                   <div className="absolute top-6 right-6 z-10">
                    <span className={`px-3 py-1 font-source-sans text-[10px] font-bold uppercase tracking-[0.1em] ${
                      exp.status === 'soldOut' ? 'bg-zinc-800 text-zinc-500' : 'bg-gold text-black'
                    }`}>
                      {e.status[exp.status as keyof typeof e.status]}
                    </span>
                  </div>
                )}
                <div className="w-full h-full bg-zinc-800 group-hover:scale-110 transition-transform duration-1000 ease-out opacity-70"></div>
              </div>

              <div className="px-8 pt-8 flex justify-between items-center">
                <span className="font-source-sans text-[13px] font-semibold text-gold tracking-widest uppercase italic">
                  {exp.date}
                </span>
                <div className="text-right">
                  <span className="font-source-sans text-[16px] text-white font-medium">{exp.price}€</span>
                  <span className="block font-source-sans text-[9px] text-zinc-500 uppercase tracking-tighter">{e.labels.perPerson}</span>
                </div>
              </div>

              <div className="px-8 pb-8 pt-4 flex flex-col flex-grow">
                <h3 className="font-cormorant text-[28px] text-white italic mb-10 leading-tight group-hover:translate-x-1 transition-transform duration-300">
                  {exp.title}
                </h3>
                <button 
                  disabled={exp.status === 'soldOut'}
                  className={`mt-auto w-full py-4 font-source-sans text-[12px] font-bold uppercase tracking-[0.3em] transition-all border ${
                    exp.status === 'soldOut' 
                    ? 'border-zinc-800 text-zinc-600 cursor-not-allowed' 
                    : 'border-gold/40 text-white hover:bg-gold hover:text-black active:scale-95'
                  }`}
                >
                  {exp.status === 'soldOut' ? e.status.soldOut : e.labels.reserve}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer lang={lang} dict={dict} />
    </main>
  );
}