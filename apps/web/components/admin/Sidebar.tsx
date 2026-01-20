'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const modules = [
  { id: '01', name: 'Dashboard', path: '/dashboard' },
  { id: '02', name: 'Reservas', path: '/bookings' },
  { id: '03', name: 'Chefs', path: '/chefs' },
  { id: '04', name: 'Clientes', path: '/customers' },
  { id: '05', name: 'Marketing', path: '/marketing' },
  { id: '06', name: 'Eventos', path: '/events' },
  { id: '07', name: 'Qualidade', path: '/quality' },
  { id: '08', name: 'Financeiro', path: '/finance' },
];

export default function Sidebar() {
  const params = useParams();
  const lang = params?.lang || 'pt';

  return (
    <aside className="w-64 bg-[#111111] text-white flex flex-col border-r border-white/5 h-full shrink-0">
      <div className="p-6 flex flex-col h-full">
        <div className="text-xs tracking-[0.2em] text-gray-500 font-bold uppercase mb-10">
          Chef on Demand
        </div>
        
        <nav className="space-y-1 flex-1">
          {modules.map((m) => (
            <Link 
              key={m.id} 
              href={`/${lang}/${m.path}`}
              className="group flex items-center px-3 py-3 text-sm font-medium rounded-md hover:bg-white/5 transition-all"
            >
              <span className="text-gray-600 group-hover:text-[#D4AF37] mr-3 text-[10px] font-bold">
                {m.id}
              </span>
              {m.name}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/10 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-xs font-bold text-black">
              RM
            </div>
            <div className="text-xs">
              <p className="font-semibold text-white">Rui Moreno</p>
              <p className="text-gray-500 font-medium uppercase tracking-tighter text-[9px]">CEO / Governance Lvl 3</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}