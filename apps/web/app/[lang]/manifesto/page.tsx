import React from 'react';
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { getDictionary } from '../../../lib/get-dictionary';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function ManifestoPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const m = dict.manifesto;

  return (
    <main className="flex flex-col bg-black min-h-screen">
      <Navbar lang={lang} dict={dict.nav} />

      <section className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-source-sans text-[13px] font-semibold uppercase tracking-[0.5em] text-gold mb-10 block">
            {m.tag}
          </span>
          
          <h1 className="font-cormorant text-[48px] md:text-[82px] font-semibold text-white tracking-[0.02em] leading-tight mb-16">
            {m.title}
          </h1>

          <div className="h-[1px] w-24 bg-gold/30 mx-auto mb-24"></div>

          <div className="space-y-16 text-zinc-300">
            <div className="space-y-6">
              <p className="font-cormorant text-[32px] md:text-[42px] italic font-medium leading-relaxed text-white">
                "{m.intro}"
              </p>
            </div>

            <div className="font-source-sans text-[14px] md:text-[18px] font-semibold uppercase tracking-[0.3em] space-y-4 text-zinc-400 py-8">
              <p>{m.worldContext}</p>
              <p className="text-gold text-[18px] md:text-[22px] tracking-[0.4em]">{m.values}</p>
            </div>

            <div className="font-cormorant text-[24px] md:text-[28px] font-medium leading-relaxed space-y-12 max-w-3xl mx-auto text-white/90">
              <p>{m.p1}</p>
              <p className="italic text-gold/90 border-l border-gold/20 pl-8 md:pl-12 py-2 mx-auto max-w-2xl text-left">{m.p2}</p>
              <p>{m.p3}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-y border-white/5">
              <div className="space-y-3">
                <p className="font-source-sans text-[12px] font-bold uppercase tracking-[0.3em] text-white">{m.pillars.p1}</p>
                <p className="font-source-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold/60 italic">{m.pillars.p1Sub}</p>
              </div>
              <div className="space-y-3">
                <p className="font-source-sans text-[12px] font-bold uppercase tracking-[0.3em] text-white">{m.pillars.p2}</p>
                <p className="font-source-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold/60 italic">{m.pillars.p2Sub}</p>
              </div>
              <div className="space-y-3">
                <p className="font-source-sans text-[12px] font-bold uppercase tracking-[0.3em] text-white">{m.pillars.p3}</p>
                <p className="font-source-sans text-[10px] font-medium uppercase tracking-[0.2em] text-gold/60 italic">{m.pillars.p3Sub}</p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto py-12">
              <p className="font-cormorant text-[28px] md:text-[34px] leading-relaxed text-white font-medium mb-8">
                {m.tech.main}
              </p>
              <div className="space-y-4">
                <p className="font-cormorant text-[22px] md:text-[26px] italic text-gold">{m.tech.item1}</p>
                <p className="font-cormorant text-[22px] md:text-[26px] italic text-gold">{m.tech.item2}</p>
                <p className="font-cormorant text-[22px] md:text-[26px] italic text-gold">{m.tech.item3}</p>
              </div>
            </div>

            <div className="space-y-8 pt-10 pb-20">
              <h2 className="font-cormorant text-[38px] md:text-[52px] text-white font-semibold tracking-tight leading-tight">
                {m.conclusionTitle} <br/> 
                <span className="text-gold italic font-medium">{m.conclusionValue}</span>
              </h2>
              <div className="font-source-sans text-[12px] md:text-[14px] font-semibold uppercase tracking-[0.4em] text-zinc-500 flex justify-center gap-4">
                {m.footerValues.map((val: string, i: number) => (
                  <React.Fragment key={val}>
                    <span>{val}</span>
                    {i < m.footerValues.length - 1 && <span className="text-gold/30">•</span>}
                  </React.Fragment>
                ))}
              </div>
              <div className="pt-24">
                <p className="font-cormorant text-[26px] md:text-[32px] text-white italic max-w-2xl mx-auto border-t border-white/10 pt-12">
                  {m.finalStatement}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer lang={lang} dict={dict} />
    </main>
  );
}