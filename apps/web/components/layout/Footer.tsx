import React from 'react';
import Link from 'next/link';

interface FooterProps {
  lang: string;
  dict: {
    nav: {
      about: string;
      services: string;
      events: string;
      contact: string;
    };
    // Adicionamos estas chaves ao JSON depois, ou mantemos fixas se forem marcas registadas
  };
}

export default function Footer({ lang, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6 font-source-sans">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Coluna 1: Branding */}
          <div className="col-span-1 md:col-span-1">
            <h2 className="font-cormorant text-[28px] text-white font-semibold leading-[1.1] tracking-[0.02em] mb-6">
              Chef <span className="text-gold italic font-medium">on Demand</span>
            </h2>
            <p className="font-source-sans text-zinc-500 text-[13px] leading-[1.6] max-w-xs">
              {lang === 'pt' 
                ? "Experiências gastronómicas privadas. Ligamos chefs de elite a casas e eventos exclusivos."
                : "Curated private dining experiences. Connecting elite professional chefs with exclusive homes and events."}
            </p>
          </div>

          {/* Coluna 2: Marketplace */}
          <div>
            <h4 className="font-source-sans text-white text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">Marketplace</h4>
            <ul className="space-y-4 text-[13px]">
              <li><Link href={`/${lang}/services`} className="text-zinc-400 hover:text-gold transition-colors">{dict.nav.services}</Link></li>
              <li><Link href={`/${lang}/events`} className="text-zinc-400 hover:text-gold transition-colors">{dict.nav.events}</Link></li>
              <li><Link href={`/${lang}/about`} className="text-zinc-400 hover:text-gold transition-colors">{dict.nav.about}</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Profissionais */}
          <div>
            <h4 className="font-source-sans text-white text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">
              {lang === 'pt' ? 'Profissionais' : 'Professionals'}
            </h4>
            <ul className="space-y-4 text-[13px]">
              <li><Link href="#" className="text-zinc-400 hover:text-gold transition-colors">{lang === 'pt' ? 'Ser um Chef' : 'Become a Chef'}</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-gold transition-colors">Standards</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Suporte */}
          <div>
            <h4 className="font-source-sans text-white text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">Suporte</h4>
            <ul className="space-y-4 text-[13px]">
              <li><Link href={`/${lang}/contact`} className="text-zinc-400 hover:text-gold transition-colors">{dict.nav.contact}</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-gold transition-colors">Privacidade</Link></li>
            </ul>
          </div>
        </div>

        {/* Linha Final */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-source-sans text-zinc-600 text-[10px] uppercase tracking-widest font-medium">
            © {currentYear} Chef on Demand. All rights reserved.
          </p>
          
          <div className="flex gap-8">
            {["Instagram", "LinkedIn"].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="font-source-sans text-zinc-500 hover:text-white text-[10px] font-semibold uppercase tracking-widest transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}