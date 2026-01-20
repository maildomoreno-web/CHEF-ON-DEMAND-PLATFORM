import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface EventsProps {
  lang: string;
  dict: {
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
  };
}

export default function Events({ lang, dict }: EventsProps) {
  const featuredExperiences = [
    { 
      title: lang === 'pt' ? "O Mar e o Fogo" : "The Sea and the Fire", 
      category: dict.categories.popup, 
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      title: lang === 'pt' ? "Massa Fresca Artesanal" : "Artisan Fresh Pasta", 
      category: dict.categories.workshop, 
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      title: lang === 'pt' ? "Técnicas de Pastelaria" : "Pastry Techniques", 
      category: dict.categories.masterclass, 
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop" 
    }
  ];

  return (
    <section className="py-24 bg-black px-6 border-t border-white/5">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="font-source-sans text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-4 block">
            {dict.tag}
          </span>
          <h2 className="font-cormorant text-[36px] md:text-[42px] text-white font-medium italic tracking-[0.02em]">
            {dict.title}
          </h2>
          <div className="h-[1px] w-12 bg-gold/30 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredExperiences.map((event, index) => (
            <div key={index} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-zinc-900 border border-white/5 rounded-sm">
                <Image 
                  src={event.image} 
                  alt={event.title} 
                  fill 
                  className="object-cover opacity-70 group-hover:opacity-90 transition-all duration-1000 group-hover:scale-110" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="space-y-3 text-center">
                <p className="font-source-sans text-gold/60 text-[10px] font-bold uppercase tracking-[0.2em]">
                  {event.category}
                </p>
                <h3 className="font-cormorant text-[24px] md:text-[26px] text-white italic group-hover:text-gold transition-colors duration-300">
                  {event.title}
                </h3>
                
                <div className="pt-4">
                  <Link 
                    href={`/${lang}/events`} 
                    className="inline-block font-source-sans text-[10px] font-bold uppercase tracking-[0.2em] bg-gold text-black px-8 py-3 rounded-none hover:bg-white transition-all active:scale-95"
                  >
                    {dict.labels.reserve}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}