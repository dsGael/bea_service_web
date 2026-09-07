import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Separator } from '@/components/ui/separator';
import { Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserMenu } from './UserMenu';

const TITULOS: Record<string, string> = {
  '/tickets': 'Mesa de Control',
  '/checador': 'Checador',
  '/almacen': 'Almacén',
  '/catalogos': 'Catálogos',
  '/usuarios': 'Usuarios',
};

function useTituloPagina() {
  const { pathname } = useLocation();
  const base = '/' + pathname.split('/')[1]; // "/tickets/032bb01f" -> "/tickets"
  return TITULOS[base] ?? 'Mesa de Control';
}

export function AppLayout() {
  const titulo = useTituloPagina();


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex shrink-0 items-center justify-between h-18 gap-2  px-4 bg-primary text-primary-foreground">
                  <h1 className="text-xl font-semibold">{titulo}</h1>
          {/* aquí podrías meter breadcrumbs a futuro */}
                    <UserMenu/>

        </header>
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}