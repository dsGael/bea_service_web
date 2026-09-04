import { Link, useLocation } from 'react-router-dom';
import {
  Ticket,
  ClipboardCheck,
  Warehouse,
  Boxes,
  Users,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const NAV_ITEMS = [
  { title: 'Tickets', url: '/tickets', icon: Ticket },
  { title: 'Checador', url: '/checador', icon: ClipboardCheck },
  { title: 'Almacén', url: '/almacen', icon: Warehouse },
  { title: 'Catálogos', url: '/catalogos', icon: Boxes },
  { title: 'Usuarios', url: '/usuarios', icon: Users },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">
            Mesa de Control
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                // startsWith para que /tickets/:id también marque "Tickets" como activo
                const isActive = location.pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.title}
                      render={<Link to={item.url} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}