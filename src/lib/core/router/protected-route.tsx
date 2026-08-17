import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/auth-context';
import { useRestaurarSesion } from '../auth/use-auth-query';

export function ProtectedRoute() {
  useRestaurarSesion(); // Verifica el token en cada recarga
  
  const { isLogged } = useAuth();
  
  if (!isLogged) return <Navigate to="/login" replace />;
  
  return <Outlet />;
}