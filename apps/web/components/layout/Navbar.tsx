// apps/web/components/layout/Navbar.tsx
import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  lang: string;
  dict: {
    manifesto: string;
    about: string;
    services: string;
    events: string;
    contact: string;
    book: string;
  };
}

export default function Navbar({ lang, dict }: NavbarProps) {
  const navLinks = [
    { label: dict.manifesto, href: `/${lang}/manifesto` },
    { label: dict.about, href: `/${lang}/about` },
    { label: dict.services, href: `/${lang}/services` },
    { label: dict.events, href: `/${lang}/events` },
    { label: dict.contact, href: `/${lang}/contact` },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Language bar - Lettering aumentado para 11px SemiBold */}
        <div className="flex justify-end py-3">
          <div className="flex gap-4 font-source-sans text-[11px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">
            <Link href="/pt" className={lang === 'pt' ? 'text-gold' : 'hover:text-white transition-colors'}>PT</Link>
            <span className="opacity-20">|</span>
            <Link href="/en" className={lang === 'en' ? 'text-gold' : 'hover:text-white transition-colors'}>EN</Link>
          </div>
        </div>

        {/* Main Nav */}
        <div className="flex items-center justify-between py-5">
          <Link href={`/${lang}`} className="group">
            <span className="font-cormorant text-[22px] md:text-[26px] text-white font-semibold tracking-[0.02em] leading-none transition-all">
              Chef <span className="text-gold italic font-medium">on Demand</span>
            </span>
          </Link>
          
          <div className="hidden space-x-12 md:flex">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="font-source-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Botão Reservar removido para despoluir a interface */}
          <div className="w-[1px] md:w-auto"></div>
        </div>
      </div>
    </nav>
  );
}