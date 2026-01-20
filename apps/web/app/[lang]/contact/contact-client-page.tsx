'use client';

import React, { useState, useTransition, use } from 'react';
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import { sendContactForm } from "./actions";

export default function ContactClientPage({ params, dict }: { params: Promise<{ lang: string }>, dict: any }) {
  const resolvedParams = use(params);
  const lang = resolvedParams.lang;
  const c = dict.contact;
  const isPt = lang === 'pt';
  
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  async function handleSubmit(formData: FormData) {
    setStatus('idle');
    
    startTransition(async () => {
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        honeypot: formData.get('hp_field'),
        lang: lang
      };

      const result = await sendContactForm(payload);
      
      if (result.success) {
        setStatus('success');
        const form = document.getElementById('contact-form') as HTMLFormElement;
        if (form) form.reset();
      } else {
        setStatus('error');
      }
    });
  }

  return (
    <main className="flex flex-col bg-black min-h-screen">
      <Navbar lang={lang} dict={dict.nav} />

      <section className="relative pt-48 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="font-source-sans text-[12px] font-semibold uppercase tracking-[0.5em] text-gold mb-8 block">
            {c.tag}
          </span>
          <h1 className="font-cormorant text-[42px] md:text-[56px] font-semibold text-white tracking-[0.01em] leading-tight mb-10">
            {c.title}
          </h1>
          <p className="font-cormorant text-[22px] md:text-[28px] text-zinc-400 leading-relaxed italic max-w-2xl border-l border-gold/30 pl-8">
            {c.intro}
          </p>
        </div>
      </section>

      <section className="py-20 px-6 mb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          <div className="space-y-16">
            <div className="space-y-4">
              <h4 className="font-source-sans text-white text-[11px] font-bold uppercase tracking-[0.2em] opacity-50">
                {c.info.office}
              </h4>
              <p className="font-source-sans text-zinc-300 text-[15px] leading-relaxed uppercase tracking-wider">
                Avenida da Liberdade, Lisboa <br /> Portugal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 border-t border-white/5 pt-12">
              {[
                { label: c.info.general.label, desc: c.info.general.desc, email: "info@chefondemand.art" },
                { label: c.info.support.label, desc: c.info.support.desc, email: "helpdesk@chefondemand.art" },
                { label: c.info.partners.label, desc: c.info.partners.desc, email: "partners@chefondemand.art" },
                { label: c.info.marketing.label, desc: c.info.marketing.desc, email: "marketing@chefondemand.art" }
              ].map((dept) => (
                <div key={dept.email} className="space-y-3">
                  <h5 className="font-source-sans text-gold text-[12px] font-bold uppercase tracking-wider">{dept.label}</h5>
                  <p className="font-source-sans text-zinc-500 text-[13px] leading-relaxed mb-2">{dept.desc}</p>
                  <a href={`mailto:${dept.email}`} className="font-source-sans text-white text-[14px] hover:text-gold transition-colors underline underline-offset-4 decoration-white/10 hover:decoration-gold">
                    {dept.email}
                  </a>
                </div>
              ))}
            </div>

            <div className="pt-12 border-t border-white/5">
              <h4 className="font-source-sans text-white text-[11px] font-bold uppercase tracking-[0.2em] opacity-50 mb-8">
                {c.info.social}
              </h4>
              <div className="flex gap-10">
                {["Instagram", "LinkedIn", "Facebook"].map((social) => (
                  <a key={social} href="#" className="font-cormorant text-[24px] text-white italic hover:text-gold transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-zinc-950/50 border border-white/5 p-8 md:p-12">
            <form id="contact-form" action={handleSubmit} className="space-y-8">
              <input type="text" name="hp_field" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-source-sans text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">{c.form.name}</label>
                  <input name="name" required type="text" className="w-full bg-transparent border-b border-white/10 py-3 font-source-sans text-white focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-source-sans text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">{c.form.email}</label>
                  <input name="email" required type="email" className="w-full bg-transparent border-b border-white/10 py-3 font-source-sans text-white focus:outline-none focus:border-gold transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-source-sans text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">{c.form.subject}</label>
                <select 
                  name="subject" 
                  defaultValue="event"
                  className="w-full bg-transparent border-b border-white/10 py-3 font-source-sans text-white focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                >
                  <option className="bg-black" value="event">{c.form.subjects.event}</option>
                  <option className="bg-black" value="chef">Chef</option>
                  <option className="bg-black" value="marketing">{isPt ? "Marketing & Publicidade" : "Marketing & Advertising"}</option>
                  <option className="bg-black" value="press">{isPt ? "Imprensa" : "Press"}</option>
                  <option className="bg-black" value="support">{c.form.subjects.support}</option>
                  <option className="bg-black" value="other">{c.form.subjects.other}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-source-sans text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">{c.form.message}</label>
                <textarea name="message" required rows={4} className="w-full bg-transparent border-b border-white/10 py-3 font-source-sans text-white focus:outline-none focus:border-gold transition-colors resize-none"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-gold text-black font-source-sans text-[12px] font-bold uppercase tracking-[0.3em] py-5 hover:bg-white transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isPending ? (isPt ? "A ENVIAR..." : "SENDING...") : c.form.send}
              </button>

              {status === 'success' && (
                <p className="font-source-sans text-gold text-[12px] text-center uppercase tracking-widest animate-pulse">
                  {isPt ? "Mensagem enviada com sucesso." : "Message sent successfully."}
                </p>
              )}
              {status === 'error' && (
                <p className="font-source-sans text-red-500 text-[12px] text-center uppercase tracking-widest">
                  {isPt ? "Ocorreu um erro. Tente novamente." : "An error occurred. Please try again."}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer lang={lang} dict={dict} />
    </main>
  );
}