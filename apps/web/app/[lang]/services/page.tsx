import React from 'react';
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { getDictionary } from '../../../lib/get-dictionary';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function ServicesPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const s = dict.services;

  const segmentKeys = ['private', 'stays', 'bespoke'] as const;

  return (
    <main className="flex flex-col bg-black min-h-screen">
      <Navbar lang={lang} dict={dict.nav} />

      <section className="relative pt-48 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="font-source-sans text-[12px] font-semibold uppercase tracking-[0.5em] text-gold mb-8 block">
            {s.tag}
          </span>
          <h1 className="font-cormorant text-[42px] md:text-[56px] font-semibold text-white tracking-[0.01em] leading-tight mb-10">
            {s.title}
          </h1>
          <p className="font-cormorant text-[22px] md:text-[28px] text-zinc-400 leading-relaxed italic max-w-2xl border-l border-gold/30 pl-8">
            {s.intro}
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {segmentKeys.map((key) => {
            const segment = s[key];
            const isStays = key === 'stays';
            
            return (
              <div 
                key={key} 
                className={`flex flex-col p-10 transition-all border ${
                  isStays 
                  ? 'border-gold/20 bg-zinc-950/60 shadow-2xl shadow-gold/5' 
                  : 'border-white/5 bg-zinc-950/30'
                }`}
              >
                <h3 className="font-cormorant text-[32px] text-white mb-2 italic">
                  {segment.title}
                </h3>
                <span className="font-source-sans text-[11px] font-medium text-gold/60 uppercase tracking-[0.2em] mb-8 block italic">
                  {segment.tagline}
                </span>
                
                <p 
                  dangerouslySetInnerHTML={{ __html: segment.desc }}
                  className="font-source-sans text-zinc-400 text-[16px] leading-relaxed mb-10 [&>strong]:text-white [&>strong]:font-semibold"
                />
                
                <div className="mt-auto pt-8 border-t border-white/5">
                  <ul className="space-y-4">
                    {segment.items.map((item: string) => (
                      <li key={item} className="font-source-sans text-[12px] text-zinc-500 uppercase tracking-widest flex items-center gap-3">
                        <span className="w-1 h-1 bg-gold/40 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-32 px-6 text-center border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="h-[1px] w-12 bg-gold/40 mx-auto mb-12"></div>
          <p className="font-cormorant text-[26px] md:text-[32px] text-white/90 italic leading-relaxed">
            {lang === 'pt' 
              ? "A tecnologia ao serviço do essencial: o paladar, o tempo e a sua total tranquilidade."
              : "Technology serving the essential: taste, time, and your total peace of mind."}
          </p>
        </div>
      </section>

      <Footer lang={lang} dict={dict} />
    </main>
  );
}