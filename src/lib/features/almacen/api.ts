import { apiClient } from '@/lib/core/api/axios-client';
import type {
  Almacen,
  CrearAlmacenPayload,
  ActualizarAlmacenPayload,
  Movimiento,
  RegistrarMovimientoPayload,
  DispositivoResumen,
  AlmacenDetalle,
} from './types';

export async function listarAlmacenes() {
  const { data } = await apiClient.get<Almacen[]>('/almacen');
  return data;
}



export async function crearAlmacen(payload: CrearAlmacenPayload) {
  const { data } = await apiClient.post<Almacen>('/almacen', payload);
  return data;
}

export async function actualizarAlmacen(id: string, payload: ActualizarAlmacenPayload) {
  const { data } = await apiClient.patch<Almacen>(`/almacen/${id}`, payload);
  return data;
}

export async function listarMovimientos(params?: {
  idAlmacen?: string;
  idDispositivo?: string;
}) {
  const { data } = await apiClient.get<Movimiento[]>('/movimientos', { params });
  return data;
}

export async function registrarMovimiento(payload: RegistrarMovimientoPayload) {
  const { data } = await apiClient.post<Movimiento>('/movimientos', payload);
  return data;
}

export async function consultarExistencia(idAlmacen: string, idDispositivo: string) {
  const { data } = await apiClient.get<{
    idAlmacen: string;
    idDispositivo: string;
    existencia: number;
  }>('/movimientos/existencia', { params: { idAlmacen, idDispositivo } });
  return data;
}

export async function listarDispositivos() {
  const { data } = await apiClient.get<DispositivoResumen[]>('/catalogos/tipos-dispositivos');
  return data;
}

export async function obtenerAlmacen(id: string) {
  const { data } = await apiClient.get<AlmacenDetalle>(`/almacen/${id}`);
  return data;
}