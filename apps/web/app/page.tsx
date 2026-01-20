import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redireciona automaticamente para a versão portuguesa por padrão
  redirect('/pt');
}