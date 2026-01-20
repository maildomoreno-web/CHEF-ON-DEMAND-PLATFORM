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

  const adminLinks = [
    { label: "ChefPanel", href: "/chef-dashboard" },
    { label: "AdminPanel", href: "/admin" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Top bar */}
        <div className="flex justify-end gap-6 border-b border-white/[0.03] py-2">
          {adminLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className="font-source-sans text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-500 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 font-source-sans text-[9px] font-medium tracking-widest text-zinc-500">
            {/* Correção: Links de idioma agora forçam a rota correta */}
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
          
          <div className="hidden space-x-10 md:flex">
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

          <button className="font-source-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-black bg-gold px-6 py-2.5 hover:bg-white transition-all active:scale-95">
            {dict.book}
          </button>
        </div>
      </div>
    </nav>
  );
}