import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { ticketsApi, ticketsKeys } from '../api';
import type { ListarTicketsParams } from '../types';

export function useTickets(params: ListarTicketsParams) {
  return useQuery({
    queryKey: ticketsKeys.list(params),
    queryFn: () => ticketsApi.listar(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useTicketDetail(id: string) {
  return useQuery({
    queryKey: ticketsKeys.detail(id),
    queryFn: () => ticketsApi.obtenerDetalle(id),
    enabled: !!id,
  });
}