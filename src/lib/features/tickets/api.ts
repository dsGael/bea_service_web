import { apiClient } from '@/lib/core/api/axios-client';
import type { AsignacionDiaria, BinTicket, CatAutobus, CatPrioridad, CatReporta, CatRuta, CrearTicketPayload, DispositivoDeAutobus, FallaPorTipo, ListarTicketsParams, ListarTicketsResponse, TecnicoAsignable } from './types';



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
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'imagenes' || key === 'videos') return;
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, String(value));
    }
  });

  // ambos van bajo el mismo campo multipart: evidenciasFalla
  payload.imagenes?.forEach((file) => formData.append('evidenciasFalla', file));
  payload.videos?.forEach((file) => formData.append('evidenciasFalla', file));

  const { data } = await apiClient.post('/tickets', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
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
   listarReporta: async (): Promise<CatReporta[]> => {
    const { data } = await apiClient.get('/catalogos/reporta');
    return data;
  },

  listarCategorias: async (): Promise<{ idCategoria: string; nombre: string }[]> => {
    const { data } = await apiClient.get('/catalogos/categorias');
    return data;
  },

  listarTecnicos: async (): Promise<TecnicoAsignable[]> => {
    const { data } = await apiClient.get('/usuarios/tecnicos');
    return data;
  },

  obtenerAsignacionReciente: async (numeroEconomico: string): Promise<AsignacionDiaria | null> => {
    const { data } = await apiClient.get(`/catalogos/asignacion-diaria/autobus/${numeroEconomico}/reciente`);
    return data;
  },

  listarRutas: async (): Promise<CatRuta[]> => {
    const { data } = await apiClient.get('/catalogos/rutas');
    return data;
  },
};



