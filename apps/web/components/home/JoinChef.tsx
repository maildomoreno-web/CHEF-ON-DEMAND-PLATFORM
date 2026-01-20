import React from 'react';

interface JoinChefProps {
  dict: {
    title: string;
    subtitle: string;
    btn: string;
  };
}

export default function JoinChef({ dict }: JoinChefProps) {
  return (
    /* py-8 no mobile e py-10 no desktop para uma faixa realmente fina e elegante */
    <section className="py-8 md:py-10 bg-gold px-6 text-center">
      {/* max-w-lg para concentrar o conteúdo e evitar que a faixa pareça vazia ou larga demais */}
      <div className="max-w-lg mx-auto text-black">
        {/* H2: Cormorant SemiBold - Reduzido para 32px para manter a proporção com a faixa fina */}
        <h2 className="font-cormorant text-[26px] md:text-[32px] font-semibold mb-2 tracking-[0.01em] leading-tight text-black">
          {dict.title}
        </h2>

        {/* Subhead: Source Sans 3 Semibold - 12px para extrema elegância */}
        <p className="font-source-sans text-black/80 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.25em] mb-6 leading-relaxed">
          {dict.subtitle}
        </p>

        {/* CTA: Botão minimalista para não quebrar a estética 'Slim' */}
        <button className="font-source-sans text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] bg-black text-white px-8 py-3 rounded-full hover:bg-zinc-900 transition-all duration-500 shadow-md">
          {dict.btn}
        </button>
      </div>
    </section>
  );
}