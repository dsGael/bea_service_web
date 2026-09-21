import { Warehouse, ArrowLeftRight, Truck, type LucideIcon } from 'lucide-react';

export interface SubmoduloAlmacen {
  slug: string;
  label: string;
  descripcion: string;
  icon: LucideIcon;
}

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