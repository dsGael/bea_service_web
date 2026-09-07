import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/lib/core/auth/auth-context';

export function UserMenu() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const iniciales = usuario?.nombre
    ?.split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-muted">
        <Avatar className="h-7 w-7">
          <AvatarFallback className="text-xs">{iniciales}</AvatarFallback>
        </Avatar>
        {/* <span className="font-medium">{usuario?.nombre}</span> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-75 p`-2">
        <div className=" px-3 py-1.5 ">
          <p className="text-sm font-medium">{usuario?.nombre}</p>
          <p className="text-xs text-muted-foreground">{usuario?.perfil}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" /> Perfil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}