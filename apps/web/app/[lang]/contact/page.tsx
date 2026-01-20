// Subimos níveis para sair de: contact -> [lang] -> app -> web
// E entramos em: ../../../lib/get-dictionary
import { getDictionary } from "../../../lib/get-dictionary";
import ContactClientPage from "./contact-client-page";

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  
  // Agora o caminho para o dicionário será resolvido corretamente pela lib
  const dict = await getDictionary(lang);

  return <ContactClientPage params={params} dict={dict} />;
}