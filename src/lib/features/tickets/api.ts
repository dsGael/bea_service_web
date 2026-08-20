import { apiClient } from '@/lib/core/api/axios-client';
import type { BinTicket, ListarTicketsParams, ListarTicketsResponse } from './types';

export const ticketsApi = {
  listar: async (params: ListarTicketsParams): Promise<ListarTicketsResponse> => {
    const { data } = await apiClient.get('/tickets', { params });
    return data;
  },

  obtenerDetalle: async (id: string): Promise<BinTicket> => {
    const { data } = await apiClient.get(`/tickets/${id}`);
    return data;
  },
};

export const ticketsKeys = {
  all: ['tickets'] as const,
  list: (params: ListarTicketsParams) => [...ticketsKeys.all, 'list', params] as const,
  detail: (id: string) => [...ticketsKeys.all, 'detail', id] as const,
};