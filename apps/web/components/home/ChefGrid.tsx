import React from 'react';

export default function ChefGrid() {
  const chefs = [
    { n: "Chef Alexandre", s: "Cozinha de Autor", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400" },
    { n: "Chef Mariana", s: "Sushi & Fusion", img: "https://images.unsplash.com/photo-1583394293214-28dea15ee548?q=80&w=400" },
    { n: "Chef Ricardo", s: "Fine Dining", img: "https://images.unsplash.com/photo-1595273670150-db0c3c39243f?q=80&w=400" },
    { n: "Chef Sofia", s: "Pastelaria", img: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?q=80&w=400" },
    { n: "Chef Vitor", s: "Cozinha Tradicional", img: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=400" },
    { n: "Chef Ana", s: "Veggie Gourmet", img: "https://images.unsplash.com/photo-1590159746766-7f3083511699?q=80&w=400" },
    { n: "Chef Paulo", s: "Carnes Selecionadas", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=400" },
    { n: "Chef Elena", s: "Cozinha Italiana", img: "https://images.unsplash.com/photo-1595273670150-db0c3c39243f?q=80&w=400" },
    { n: "Chef Hugo", s: "Marisco & Peixe", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400" }
  ];

  return (
    <section className="py-24 px-6 bg-zinc-950">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="font-cormorant text-[32px] md:text-[42px] font-medium text-gold mb-16 tracking-[0.03em]">
          Top Rated Chefs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {chefs.map((chef, i) => (
            <div key={i} className="group relative border border-gold/10 bg-black overflow-hidden h-[380px]">
              <img src={chef.img} alt={chef.n} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full text-left">
                <h4 className="font-source-sans text-[14px] font-semibold uppercase text-white tracking-widest mb-1">{chef.n}</h4>
                <p className="font-source-sans text-[10px] text-gold font-medium uppercase tracking-widest mb-4">{chef.s}</p>
                <button className="font-source-sans text-[9px] font-semibold uppercase tracking-[0.2em] bg-gold text-black px-6 py-2.5 hover:bg-white transition-all">
                  Ver Perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}