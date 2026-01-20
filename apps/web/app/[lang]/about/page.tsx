import React from 'react';
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { getDictionary } from '../../../lib/get-dictionary';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const a = dict.about;

  return (
    <main className="flex flex-col bg-black min-h-screen">
      <Navbar lang={lang} dict={dict.nav} />

      <section className="relative pt-48 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="font-source-sans text-[12px] font-semibold uppercase tracking-[0.5em] text-gold mb-8 block">
            {a.tag}
          </span>
          <h1 className="font-cormorant text-[42px] md:text-[56px] font-semibold text-white tracking-[0.01em] leading-[1.1] mb-10">
            {a.title}
          </h1>
          <p className="font-cormorant text-[22px] md:text-[28px] text-white/80 leading-[1.4] italic border-l border-gold/30 pl-8 max-w-3xl">
            {a.intro}
          </p>
        </div>
      </section>

      <section className="py-24 bg-zinc-950 px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-source-sans text-[11px] font-bold uppercase tracking-[0.4em] text-gold">O Contexto</h2>
            <p className="font-source-sans text-[20px] md:text-[24px] font-medium text-white leading-relaxed">
              {a.model}
            </p>
          </div>
          <div className="font-source-sans text-zinc-400 text-[16px] md:text-[17px] leading-relaxed">
            <p 
              dangerouslySetInnerHTML={{ __html: a.market }} 
              className="[&>strong]:text-white [&>strong]:font-bold"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="space-y-8 group">
            <div className="space-y-4">
              <h3 className="font-cormorant text-[32px] md:text-[40px] text-white font-semibold group-hover:text-gold transition-colors italic">Chefs</h3>
              <div className="h-[1px] w-10 bg-gold/50"></div>
            </div>
            <p 
              dangerouslySetInnerHTML={{ __html: a.freedom }}
              className="font-source-sans text-zinc-400 text-[16px] md:text-[18px] leading-relaxed [&>strong]:text-white [&>strong]:font-semibold"
            />
          </div>

          <div className="space-y-8 group">
            <div className="space-y-4">
              <h3 className="font-cormorant text-[32px] md:text-[40px] text-white font-semibold group-hover:text-gold transition-colors italic">Clientes</h3>
              <div className="h-[1px] w-10 bg-gold/50"></div>
            </div>
            <div className="bg-white/[0.02] p-8 border-l border-gold/15">
              <p 
                dangerouslySetInnerHTML={{ __html: a.client }}
                className="font-source-sans text-zinc-400 text-[16px] md:text-[18px] leading-relaxed [&>strong]:text-white [&>strong]:font-semibold"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gold px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p 
            dangerouslySetInnerHTML={{ __html: a.notAgency }}
            className="font-cormorant text-[22px] md:text-[28px] text-black font-semibold leading-tight tracking-tight italic"
          />
        </div>
      </section>

      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="h-[1px] w-12 bg-gold/40 mx-auto mb-12"></div>
          <p className="font-cormorant text-[26px] md:text-[32px] text-white/90 italic leading-relaxed">
            {a.vision}
          </p>
        </div>
      </section>

      <Footer lang={lang} dict={dict} />
    </main>
  );
}