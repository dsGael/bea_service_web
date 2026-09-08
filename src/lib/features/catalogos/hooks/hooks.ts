import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { catalogosApi, catalogosKeys } from '../api';

export function useCatalogo(slug: string) {
  return useQuery({
    queryKey: catalogosKeys.list(slug),
    queryFn: () => catalogosApi.listar(slug),
    staleTime: 5 * 60 * 1000, // los catálogos cambian poco, el propio backend ya cachea 300s
  });
}

export function useCatalogoRegistro(slug: string, id: string | null) {
  return useQuery({
    queryKey: id ? catalogosKeys.detail(slug, id) : [...catalogosKeys.all, 'empty-detail'],
    queryFn: () => catalogosApi.obtener(slug, id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}



export function useCrearRegistro(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: Record<string, unknown>) => catalogosApi.crear(slug, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogosKeys.list(slug) });
    },
  });
}

export function useActualizarRegistro(slug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: Record<string, unknown> }) =>
      catalogosApi.actualizar(slug, id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: catalogosKeys.list(slug) });
    },
  });
}