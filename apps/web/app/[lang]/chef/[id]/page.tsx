'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const getChefData = (lang: string) => {
  return {
    name: "MARCO PIERRE",
    specialty: "EXPERIÊNCIA ESTRELA MICHELIN",
    about: "Mestre da culinária francesa com 20 anos de excelência e rigor técnico inabalável.",
    image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=600",
    occupiedDates: ["2026-01-20", "2026-01-25", "2026-02-01"], 
    services: [
      { 
        id: "s1", 
        title: "L'ART DE LA CUISINE", 
        description: "Uma jornada sensorial profunda pelos clássicos da alta gastronomia francesa.",
        dishes: [
          { name: "AMUSE-BOUCHE", detail: "Foie gras de pato com redução de figos ramy e flor de sal." },
          { name: "ENTRÉE", detail: "Vieiras da costa grelhadas, puré de couve-flor trufado e espuma de mar." },
          { name: "PLAT PRINCIPAL", detail: "Magret de Canard maturado com mel de urze e especiarias do oriente." },
          { name: "DESSERT", detail: "Soufflé de Grand Marnier com gelado de baunilha Bourbon." }
        ],
        price: 160 
      },
      { 
        id: "s2", 
        title: "SIGNATURE TASTING", 
        description: "A máxima expressão da criatividade do Chef, adaptada aos melhores produtos do dia.",
        dishes: [
          { name: "MENU DE 7 MOMENTOS", detail: "Uma sequência cega onde o Chef apresenta as suas técnicas mais vanguardistas e sazonais." }
        ],
        price: 220 
      },
      { 
        id: "s3", 
        title: "HERITAGE MENU", 
        description: "Receitas ancestrais revisitadas com ingredientes orgânicos certificados e técnicas de fogo.",
        dishes: [
          { name: "ENTRÉE", detail: "Sopa de cebola caramelizada por 48h com crosta de Gruyère reserva." },
          { name: "PLAT PRINCIPAL", detail: "Robalo de linha ao sal com ervas da Provença e legumes da estação." },
          { name: "DESSERT", detail: "Tarte Tatin clássica com crème fraîche artesanal." }
        ],
        price: 140 
      }
    ],
    upsells: [
      { id: "u1", title: "HARMONIZAÇÃO PREMIUM", description: "Vinhos reserva selecionados para cada etapa do menu.", price: 95 },
      { id: "u2", title: "SERVIÇO DE SOMMELIER", description: "Especialista dedicado para serviço e explicação técnica de vinhos.", price: 150, perEvent: true },
      { id: "u3", title: "MISE EN PLACE LUXURY", description: "Loiça de porcelana fina e cristais Riedel.", price: 45 }
    ]
  };
};

export default function ChefPremiumPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang; // Guardamos o lang para usar no Link
  const chef = getChefData(lang);
  
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [guests, setGuests] = useState<number>(2);
  const [selectedUpsells, setSelectedUpsells] = useState<string[]>([]);
  const [eventDate, setEventDate] = useState<string>("");
  const [dateError, setDateError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value;
    setDateError(null);
    if (chef.occupiedDates.includes(selected)) {
      setDateError("Data indisponível. O Chef já tem uma reserva.");
      setEventDate("");
    } else {
      setEventDate(selected);
    }
  };

  const totalAmount = useMemo(() => {
    let total = 0;
    const menu = chef.services.find(s => s.id === selectedMenuId);
    if (menu) total += menu.price * guests;
    selectedUpsells.forEach(uId => {
      const upsell = chef.upsells.find(u => u.id === uId);
      if (upsell) total += upsell.perEvent ? upsell.price : (upsell.price * guests);
    });
    return total;
  }, [selectedMenuId, guests, selectedUpsells, chef]);

  // FUNÇÃO DE ENVIO REAL PARA A TUA API ROUTE (NEON)
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadData.name,
          email: leadData.email,
          chef_name: chef.name,
          event_date: eventDate,
          total_amount: totalAmount,
          guests: guests,
          menu_selected: chef.services.find(s => s.id === selectedMenuId)?.title || 'Interesse Geral'
        }),
      });

      if (response.ok) {
        setIsModalOpen(false);
        alert("Pedido enviado com sucesso! O Chef entrará em contacto.");
      } else {
        alert("Erro ao enviar pedido.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F5] antialiased">
      {isModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-[#0A0A0A] border-2 border-[#D4AF37]/30 p-10 max-w-md w-full relative shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">✕</button>
            <h2 className="text-2xl font-serif font-bold italic text-white mb-2 text-center">Interesse Confirmado</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] text-center mb-10 font-black">Validar disponibilidade com o Chef</p>
            <form onSubmit={handleLeadSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">O seu nome</label>
                <input required type="text" placeholder="EX: MARCO AURÉLIO" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-[#D4AF37] text-sm uppercase tracking-widest text-white"
                  onChange={(e) => setLeadData({...leadData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">E-mail de contacto</label>
                <input required type="email" placeholder="EX: MARCO@EMAIL.COM" className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-[#D4AF37] text-sm uppercase tracking-widest text-white"
                  onChange={(e) => setLeadData({...leadData, email: e.target.value})} />
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-[#D4AF37] text-black font-black text-[11px] tracking-[0.4em] uppercase hover:bg-white transition-all shadow-xl">
                {isSubmitting ? "A ENVIAR..." : "SOLICITAR AGORA"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* NAV CORRIGIDA: Link para ${lang} e sombra para fechar a frecha */}
      <nav className="p-6 border-b border-white/10 sticky top-0 bg-[#050505] z-[100] flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
        <Link href={`/${lang}`} className="text-[10px] tracking-[0.4em] uppercase text-zinc-400 font-bold hover:text-[#D4AF37] transition-colors">← VOLTAR</Link>
        <div className="text-[12px] font-black tracking-[0.8em] text-white uppercase">CHEF ON DEMAND</div>
        <div className="w-10"></div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <div className="lg:col-span-3 lg:sticky lg:top-36 h-fit space-y-8 order-1">
            <div className="text-center lg:text-left">
              <img src={chef.image} className="w-40 h-40 lg:w-48 lg:h-48 rounded-full object-cover border-4 border-[#D4AF37]/40 mx-auto lg:mx-0 shadow-2xl" alt={chef.name} />
              <h1 className="text-4xl font-serif font-bold italic mt-8 text-white">{chef.name}</h1>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] mt-3 font-black">{chef.specialty}</p>
              <div className="h-px w-20 bg-[#D4AF37]/50 my-6 mx-auto lg:mx-0"></div>
              <p className="text-sm lg:text-md text-zinc-300 leading-relaxed font-light italic">{chef.about}</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="w-full py-5 bg-[#D4AF37] text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 shadow-xl">
              CONVERSAR COM O CHEF
            </button>
          </div>

          <div className="lg:col-span-5 space-y-16 order-2">
            <section className="relative">
              {/* Z-INDEX AJUSTADO para evitar que o conteúdo passe por cima do título fixo */}
              <div className="sticky top-[73px] bg-[#050505] z-40 pt-6 pb-4 border-b border-white/10">
                <h2 className="text-[13px] uppercase tracking-[0.6em] text-[#D4AF37] font-black">MENUS DE ASSINATURA</h2>
              </div>
              
              <div className="space-y-10 mt-8">
                {chef.services.map((s) => (
                  <div key={s.id} onClick={() => setSelectedMenuId(s.id)} 
                    className={`group p-8 lg:p-10 border-2 transition-all duration-500 cursor-pointer ${selectedMenuId === s.id ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}>
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-serif font-bold italic text-white group-hover:text-[#D4AF37]">{s.title}</h3>
                        <p className="text-sm text-[#D4AF37] mt-2 font-medium uppercase tracking-widest">{s.description}</p>
                      </div>
                      <span className="text-xl lg:text-2xl font-light text-white font-serif">€{s.price}</span>
                    </div>
                    <div className="space-y-6 pt-8 border-t border-white/10">
                      {s.dishes.map((dish, idx) => (
                        <div key={idx} className="flex flex-col space-y-1">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-black">{dish.name}</span>
                          <span className="text-sm lg:text-base text-white font-medium">{dish.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-8 pb-20">
              <h2 className="text-[13px] uppercase tracking-[0.6em] text-zinc-500 font-black border-b border-white/10 pb-6">SERVIÇOS DE CONCIERGE</h2>
              <div className="grid grid-cols-1 gap-6">
                {chef.upsells.map((u) => (
                  <div key={u.id} 
                    onClick={() => setSelectedUpsells(prev => prev.includes(u.id) ? prev.filter(i => i !== u.id) : [...prev, u.id])} 
                    className={`p-6 border-2 transition-all ${selectedUpsells.includes(u.id) ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-white/5 bg-white/[0.01] hover:border-white/20 cursor-pointer'}`}>
                    <div className="flex justify-between items-center text-white">
                      <div>
                        <h4 className="text-[11px] uppercase tracking-[0.2em] font-black">{u.title}</h4>
                        <p className="text-[10px] lg:text-sm text-zinc-400 mt-1 font-light italic">{u.description}</p>
                      </div>
                      <span className="text-md text-[#D4AF37] font-bold">€{u.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-36 h-fit order-3">
            <div className="bg-[#0A0A0A] p-8 lg:p-12 border-2 border-white/10 shadow-2xl relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#D4AF37]"></div>
              <h3 className="text-[12px] tracking-[0.5em] uppercase font-black mb-10 text-center text-zinc-200">RESERVA EXCLUSIVA</h3>
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-black">DATA DO EVENTO</label>
                  <input type="date" min={today} value={eventDate} onChange={handleDateChange}
                    style={{ colorScheme: 'dark' }} // Ícone do calendário visível em modo dark
                    className={`w-full bg-transparent border-b-2 py-2 outline-none transition-all font-medium ${dateError ? 'border-red-500 text-red-500' : 'border-white/20 text-[#D4AF37] focus:border-[#D4AF37]'}`} />
                  {dateError && <p className="text-[10px] text-red-500 font-black uppercase mt-1">{dateError}</p>}
                </div>
                <div className="flex justify-between items-center text-white">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-black">CONVIDADOS</label>
                  <div className="flex items-center gap-6">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="text-2xl text-zinc-400 hover:text-white">-</button>
                    <span className="text-xl font-serif font-bold">{guests}</span>
                    <button onClick={() => setGuests(guests + 1)} className="text-2xl text-zinc-400 hover:text-white">+</button>
                  </div>
                </div>
                <div className="pt-8 border-t border-white/20">
                  <div className="flex justify-between items-baseline mb-8">
                    <span className="text-[12px] uppercase font-black tracking-[0.2em] text-zinc-400">TOTAL</span>
                    <span className="text-4xl lg:text-5xl font-serif font-bold italic text-white">€{totalAmount}</span>
                  </div>
                  <button onClick={() => setIsModalOpen(true)}
                    disabled={!selectedMenuId || !eventDate || !!dateError} 
                    className={`w-full py-6 text-[12px] font-black uppercase tracking-[0.5em] transition-all duration-700 ${selectedMenuId && eventDate && !dateError ? 'bg-[#D4AF37] text-black hover:bg-white' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}>
                    CONFIRMAR RESERVA
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}