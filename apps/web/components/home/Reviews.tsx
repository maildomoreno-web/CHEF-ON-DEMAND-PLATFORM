import React from 'react';
import { Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    { 
      t: "Experiência gastronómica inesquecível. O Chef tratou de cada detalhe com um profissionalismo raro.", 
      a: "Ana Martins" 
    },
    { 
      t: "A qualidade dos ingredientes e a técnica apresentada foram dignas de um restaurante Michelin.", 
      a: "Pedro Santos" 
    },
    { 
      t: "Reservámos para um evento privado e superou as expectativas. O menu foi o ponto alto.", 
      a: "Cláudia Vieira" 
    },
    { 
      t: "Serviço impecável e uma limpeza absoluta da cozinha no final. Tudo simplesmente divino.", 
      a: "Ricardo Lima" 
    }
  ];

  const allReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-10 md:py-14 bg-black border-y border-white/5 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        @media (min-width: 768px) {
          .animate-marquee-desktop {
            display: flex;
            width: max-content;
            animation: marquee 60s linear infinite;
          }
          .animate-marquee-desktop:hover {
            animation-play-state: paused;
          }
        }
      `}} />

      {/* Container de scroll para Mobile / Container de animação para Desktop */}
      <div className="flex w-full overflow-x-auto md:overflow-hidden no-scrollbar snap-x snap-mandatory">
        <div className="flex animate-marquee-desktop shrink-0">
          {allReviews.map((review, i) => (
            <div 
              key={i} 
              className="flex flex-col mx-6 md:mx-12 w-[85vw] md:w-[400px] shrink-0 whitespace-normal snap-center"
            >
              <div className="flex gap-1 mb-4 text-gold/40 justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              
              <p className="font-cormorant text-[18px] md:text-[21px] text-zinc-300 italic leading-[1.6] tracking-wide text-center md:text-left">
                "{review.t}"
              </p>
              
              <div className="mt-4 flex items-center gap-3 justify-center md:justify-start">
                <div className="hidden md:block h-[1px] w-6 bg-gold/30"></div>
                <span className="font-source-sans text-[10px] font-bold text-white uppercase tracking-[0.3em] opacity-60">
                  {review.a}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicador visual apenas para Mobile (Opcional) */}
      <div className="md:hidden flex justify-center mt-6 gap-1.5">
        {reviews.map((_, i) => (
          <div key={i} className="h-1 w-1 rounded-full bg-gold/30"></div>
        ))}
      </div>
    </section>
  );
}