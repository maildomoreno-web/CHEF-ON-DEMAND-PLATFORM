import { Source_Sans_3 } from 'next/font/google';
import Sidebar from '../../../components/admin/Sidebar';

const sourceSans = Source_Sans_3({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${sourceSans.className} flex h-screen bg-[#F8F9FA]`}>
      <Sidebar /> 
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}