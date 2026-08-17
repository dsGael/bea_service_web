import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/axios-client';
import { useAuth } from './auth-context';
import type { Usuario } from './auth-context';

export function useRestaurarSesion() {
  const { token, login, logout } = useAuth();
  
  const { isError } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async (): Promise<Usuario> => {
      const res = await apiClient.get('/auth/me');
      return res.data;
    },
    enabled: !!token,         // Solo corre si hay token guardado
    retry: false,             // Si falla (ej. 401), no reintenta
    staleTime: 1000 * 60 * 60 * 7, // Considera la sesión fresca por 7 horas
  });

  useEffect(() => {
    if (isError) logout(); // Token inválido o expirado — limpia y manda a login
  }, [isError, logout]);
}