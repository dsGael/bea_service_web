import { useQuery } from '@tanstack/react-query';
import { catalogosApi, catalogosKeys } from '../api';

export function useCatalogo(slug: string) {
  return useQuery({
    queryKey: catalogosKeys.list(slug),
    queryFn: () => catalogosApi.listar(slug),
    staleTime: 5 * 60 * 1000, // los catálogos cambian poco, el propio backend ya cachea 300s
  });
}

export function useCatalogoDetalle(slug: string, id: string) {
  return useQuery({
    queryKey: catalogosKeys.detail(slug, id),
    queryFn: () => catalogosApi.obtener(slug, id),
    enabled: !!slug && !!id,
  });
}