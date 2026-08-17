import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../core/api/axios-client';
import type { Ticket } from './types';

export function useTickets() {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: async (): Promise<Ticket[]> => {
      const res = await apiClient.get('/tickets');
      return res.data;
    },
    // Opcional: recargar los datos en segundo plano si es una mesa de control muy activa
    refetchInterval: 1000 * 60, // Recarga cada minuto
  });
}