import { useQuery, keepPreviousData, useQueryClient, useMutation } from '@tanstack/react-query';
import { catalogosCascadaApi, ticketsApi, ticketsKeys } from '../api';
import type { CrearTicketPayload, ListarTicketsParams } from '../types';

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

export function useAutobuses() {
  return useQuery({
    queryKey: ['catalogos', 'autobuses'],
    queryFn: catalogosCascadaApi.listarAutobuses,
    staleTime: 5 * 60 * 1000,
  });
}

export function useDispositivosPorAutobus(idAutobus: string | null) {
  return useQuery({
    queryKey: ['catalogos', 'dispositivos-autobus', idAutobus],
    queryFn: () => catalogosCascadaApi.listarDispositivosPorAutobus(idAutobus!),
    enabled: !!idAutobus, // no dispara hasta que haya autobús seleccionado
  });
}

export function useFallasPorTipoDispositivo(idDispositivoT: string | null) {
  return useQuery({
    queryKey: ['catalogos', 'fallas-tipo', idDispositivoT],
    queryFn: () => catalogosCascadaApi.listarFallasPorTipoDispositivo(idDispositivoT!),
    enabled: !!idDispositivoT,
  });
}

export function usePrioridades() {
  return useQuery({
    queryKey: ['catalogos', 'prioridades'],
    queryFn: catalogosCascadaApi.listarPrioridades,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCrearTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CrearTicketPayload) => ticketsApi.crear(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketsKeys.all });
    },
  });
}