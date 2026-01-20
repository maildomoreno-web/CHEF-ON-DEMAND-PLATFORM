import React from 'react';

interface HowItWorksProps {
  dict: {
    title: string;
    steps: Array<{ title: string; desc: string }>;
  };
}

export default function HowItWorks({ dict }: HowItWorksProps) {
  return (
    <section className="py-14 bg-black px-6 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          {/* Título: DOURADO, Cormorant SemiBold 38px, tracking 0.03em */}
          <h2 className="font-cormorant text-[32px] md:text-[38px] text-gold font-medium tracking-[0.03em]">
            {dict.title}
          </h2>
          <div className="h-[1px] w-12 bg-gold/30 mx-auto mt-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {dict.steps.map((step, index) => (
            <div key={index} className="relative group text-center md:text-left">
              <span className="font-cormorant text-[42px] md:text-[48px] text-gold/20 font-light leading-none mb-4 block">
                0{index + 1}
              </span>
              <h3 className="font-source-sans text-[14px] text-white font-semibold uppercase tracking-[0.2em] mb-3">
                {step.title}
              </h3>
              <p className="font-source-sans text-zinc-500 text-[14px] leading-relaxed max-w-sm mx-auto md:mx-0">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}