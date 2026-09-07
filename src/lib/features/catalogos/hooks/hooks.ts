import { useQuery } from '@tanstack/react-query';
import { catalogosApi, catalogosKeys } from '../api';

export function useCatalogo(slug: string) {
  return useQuery({
    queryKey: catalogosKeys.list(slug),
    queryFn: () => catalogosApi.listar(slug),
    staleTime: 5 * 60 * 1000, // los catálogos cambian poco, el propio backend ya cachea 300s
  });
}