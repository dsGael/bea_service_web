import { Link, useLocation } from 'react-router-dom';
import { Ticket, ClipboardCheck, Warehouse, Boxes, Users } from 'lucide-react';
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
  SidebarTrigger,
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
      <SidebarHeader className=" bg-primary h-18 text-primary-foreground ">
        <div className="flex items-center justify-between  py-3">
          <span className="text-md font-semibold group-data-[collapsible=icon]:hidden">
            Bea Service
          </span>
            <SidebarTrigger />

        </div>
        
      </SidebarHeader>


      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
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