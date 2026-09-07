import { apiClient } from "@/lib/core/api/axios-client";

export const catalogosApi = {
  listar: async (slug: string): Promise<Record<string, unknown>[]> => {
    const { data } = await apiClient.get(`/catalogos/${slug}`);
    return data;
  },
};

export const catalogosKeys = {
  all: ['catalogos'] as const,
  list: (slug: string) => [...catalogosKeys.all, slug] as const,
};