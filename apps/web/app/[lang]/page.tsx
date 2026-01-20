import React from 'react';
import { getDictionary } from '../../lib/get-dictionary';

import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/home/Hero";
import HowItWorks from "../../components/home/HowItWorks";
import ChefGrid from "../../components/home/ChefGrid";
import Reviews from "../../components/home/Reviews";
import JoinChef from "../../components/home/JoinChef";
import Events from "../../components/home/Events";
import Footer from "../../components/layout/Footer";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col bg-black min-h-screen">
      <Navbar lang={lang} dict={dict.nav} />
      
      <Hero 
        lang={lang} 
        dict={{
          searchPlaceholder: dict.searchPlaceholder,
          searchBtn: dict.searchBtn
        }} 
      />

      <HowItWorks 
        dict={{
          title: dict.howItWorks,
          steps: [
            { title: dict.step1Title, desc: dict.step1Desc },
            { title: dict.step2Title, desc: dict.step2Desc },
            { title: dict.step3Title, desc: dict.step3Desc }
          ]
        }} 
      />

      <ChefGrid />

      <Reviews />

      <JoinChef 
        dict={{
          title: dict.joinChefTitle,
          subtitle: dict.joinChefSubtitle,
          btn: dict.joinChefBtn
        }} 
      />

      {/* Ajustado para passar o objeto exclusivo completo conforme o contrato do componente */}
      <Events 
        lang={lang}
        dict={dict.exclusiveEvents} 
      />
      
      <Footer lang={lang} dict={dict} />
    </main>
  );
}