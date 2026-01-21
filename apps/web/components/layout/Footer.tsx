// apps/web/components/layout/Footer.tsx
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
  };
}

export default function Footer({ lang, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 px-6 font-source-sans">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Coluna 1: Branding */}
          <div>
            <h2 className="font-cormorant text-[28px] text-white font-semibold leading-[1.1] tracking-[0.02em] mb-6">
              Chef <span className="text-gold italic font-medium">on Demand</span>
            </h2>
            <p className="text-zinc-500 text-[13px] leading-[1.6] font-semibold max-w-xs">
              {lang === 'pt' 
                ? "Experiências gastronómicas privadas. Ligamos chefs de elite a casas e eventos exclusivos."
                : "Curated private dining experiences. Connecting elite professional chefs with exclusive homes and events."}
            </p>
          </div>

          {/* Coluna 2: Market Place */}
          <div>
            <h4 className="text-white text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">Market Place</h4>
            <ul className="space-y-4 text-[13px] font-semibold">
              <li><Link href={`/${lang}/services`} className="text-zinc-400 hover:text-gold transition-colors">{dict.nav.services}</Link></li>
              <li><Link href={`/${lang}/events`} className="text-zinc-400 hover:text-gold transition-colors">{dict.nav.events}</Link></li>
              <li><Link href={`/${lang}/about`} className="text-zinc-400 hover:text-gold transition-colors">{dict.nav.about}</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-gold transition-colors">FAQ's</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Profissionais */}
          <div>
            <h4 className="text-white text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">Profissionais</h4>
            <ul className="space-y-4 text-[13px] font-semibold">
              <li><Link href={`/${lang}#candidatar-me`} className="text-zinc-400 hover:text-gold transition-colors">{lang === 'pt' ? 'Registe-se como um(a) Chef' : 'Register as a Chef'}</Link></li>
              <li><Link href={`/${lang}/dashboard`} className="text-zinc-400 hover:text-gold transition-colors">{lang === 'pt' ? 'Cozinha de Produção' : 'Production Kitchen'}</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-gold transition-colors">{lang === 'pt' ? 'Termos e Condições' : 'Terms & Conditions'}</Link></li>
            </ul>
          </div>

          {/* Coluna 4: Suporte */}
          <div>
            <h4 className="text-white text-[11px] font-semibold uppercase tracking-[0.2em] mb-6">Suporte</h4>
            <ul className="space-y-4 text-[13px] font-semibold">
              <li><Link href={`/${lang}/contact`} className="text-zinc-400 hover:text-gold transition-colors">{dict.nav.contact}</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-gold transition-colors">{lang === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}</Link></li>
              <li><Link href="#" className="text-zinc-400 hover:text-gold transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        {/* Linha Final */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 font-semibold">
          <p className="text-zinc-600 text-[10px] uppercase tracking-widest">
            © {currentYear} Chef on Demand. All rights reserved.
          </p>
          <div className="flex gap-8">
            {["Instagram", "LinkedIn"].map((social) => (
              <a key={social} href="#" className="text-zinc-500 hover:text-white text-[10px] uppercase tracking-widest transition-colors">{social}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}