import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  listarAlmacenes,
  listarMovimientos,
  registrarMovimiento,
  consultarExistencia,
  listarDispositivos,
  obtenerAlmacen,
  crearAlmacen,
  actualizarAlmacen,
} from '../api';
import { QUERY_KEYS_ALMACEN, QUERY_KEYS_ALMACEN_DETALLE } from '../constants';
import type { ActualizarAlmacenPayload, RegistrarMovimientoPayload } from '../types';

export function useAlmacenes() {
  return useQuery({
    queryKey: QUERY_KEYS_ALMACEN.almacenes,
    queryFn: listarAlmacenes,
  });
}

export function useDispositivos() {
  return useQuery({
    queryKey: QUERY_KEYS_ALMACEN.dispositivos,
    queryFn: listarDispositivos,
  });
}

export function useMovimientos(filtros?: { idAlmacen?: string; idDispositivo?: string }) {
  return useQuery({
    queryKey: QUERY_KEYS_ALMACEN.movimientos(filtros),
    queryFn: () => listarMovimientos(filtros),
  });
}

export function useExistencia(idAlmacen: string, idDispositivo: string) {
  return useQuery({
    queryKey: ['almacen', 'existencia', idAlmacen, idDispositivo],
    queryFn: () => consultarExistencia(idAlmacen, idDispositivo),
    enabled: Boolean(idAlmacen && idDispositivo),
  });
}

export function useRegistrarMovimiento() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegistrarMovimientoPayload) => registrarMovimiento(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['almacen', 'movimientos'] });
      queryClient.invalidateQueries({ queryKey: ['almacen', 'existencia'] });
    },
  });
}

export function useAlmacen(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS_ALMACEN_DETALLE(id),
    queryFn: () => obtenerAlmacen(id),
    enabled: Boolean(id),
  });
}

export function useCrearAlmacen() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: crearAlmacen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS_ALMACEN.almacenes });
    },
  });
}

export function useActualizarAlmacen(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ActualizarAlmacenPayload) => actualizarAlmacen(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS_ALMACEN.almacenes });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS_ALMACEN_DETALLE(id) });
    },
  });
}