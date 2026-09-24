import { Warehouse, ArrowLeftRight, Truck, type LucideIcon } from 'lucide-react';
import type { DispositivoResumen } from './types';

export interface SubmoduloAlmacen {
  slug: string;
  label: string;
  descripcion: string;
  icon: LucideIcon;
}

export const QUERY_KEYS_ALMACEN = {
  almacenes: ['almacen', 'almacenes'] as const,
  movimientos: (filtros?: { idAlmacen?: string; idDispositivo?: string }) =>
    ['almacen', 'movimientos', filtros] as const,
  dispositivos: ['almacen', 'dispositivos'] as const, // pendiente confirmar endpoint
};

export const QUERY_KEYS_ALMACEN_DETALLE = (id: string) => ['almacen', 'detalle', id] as const;


export const SUBMODULOS_ALMACEN: SubmoduloAlmacen[] = [
  {
    slug: 'almacenes',
    label: 'Almacenes',
    descripcion: 'Consulta y administra los almacenes y su existencia.',
    icon: Warehouse,
  },
  {
    slug: 'movimientos',
    label: 'Movimientos',
    descripcion: 'Registra entradas y salidas y revisa el historial.',
    icon: ArrowLeftRight,
  },
  {
    slug: 'envios',
    label: 'Envíos',
    descripcion: 'Da seguimiento a envíos, guías y evidencias.',
    icon: Truck,
  },
];


export function requiereSerieOImei(dispositivo: DispositivoResumen | undefined) {
  return dispositivo?.requiereSerie ?? false;
}