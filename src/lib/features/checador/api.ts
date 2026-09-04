import { apiClient } from '@/lib/core/api/axios-client';
import type { RegistrarChecadaPayload, ChecadorResponse } from './types';

export const checadorApi = {
  registrar: async (payload: RegistrarChecadaPayload): Promise<ChecadorResponse> => {
    const { data } = await apiClient.post('/checador', payload);
    return data;
  },
};

export const checadorKeys = {
  all: ['checador'] as const,
};