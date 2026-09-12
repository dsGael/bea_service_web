import { apiClient } from '@/lib/core/api/axios-client';
import type { BinTicket, CatAutobus, CatPrioridad, CrearTicketPayload, DispositivoDeAutobus, FallaPorTipo, ListarTicketsParams, ListarTicketsResponse } from './types';



export const ticketsKeys = {
  all: ['tickets'] as const,
  list: (params: ListarTicketsParams) => [...ticketsKeys.all, 'list', params] as const,
  detail: (id: string) => [...ticketsKeys.all, 'detail', id] as const,
};

export const ticketsApi = {
  listar: async (params: ListarTicketsParams): Promise<ListarTicketsResponse> => {
    const { data } = await apiClient.get('/tickets', { params });
    return data;
  },

  obtenerDetalle: async (id: string): Promise<BinTicket> => {
    const { data } = await apiClient.get(`/tickets/${id}`);
    return data;
  },

  crear: async (payload: CrearTicketPayload): Promise<BinTicket> => {
    const { data } = await apiClient.post('/tickets', payload);
    return data;
  },
};

export const catalogosCascadaApi = {
  listarAutobuses: async (): Promise<CatAutobus[]> => {
    const { data } = await apiClient.get('/catalogos/autobuses');
    return data;
  },

  listarDispositivosPorAutobus: async (idAutobus: string): Promise<DispositivoDeAutobus[]> => {
    const { data } = await apiClient.get(`/catalogos/autobus/${idAutobus}/dispositivos`);
    return data;
  },

  listarFallasPorTipoDispositivo: async (idDispositivoT: string): Promise<FallaPorTipo[]> => {
    const { data } = await apiClient.get(`/catalogos/falla/dispositivotipo/${idDispositivoT}`);
    return data;
  },

  listarPrioridades: async (): Promise<CatPrioridad[]> => {
    const { data } = await apiClient.get('/catalogos/prioridades');
    return data;
  },
};