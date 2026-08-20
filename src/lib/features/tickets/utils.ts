import { ESTADO_IDS } from './constants';

interface EstadoStyle {
  color: string;
}

const ESTADO_COLORS: Record<string, EstadoStyle> = {
  [ESTADO_IDS.ABIERTO]: { color: 'bg-blue-100 text-blue-700 border-blue-200' },
  [ESTADO_IDS.VALIDACION_MC]: { color: 'bg-amber-100 text-amber-700 border-amber-200' },
  [ESTADO_IDS.FINALIZADO]: { color: 'bg-green-100 text-green-700 border-green-200' },
  [ESTADO_IDS.CANCELADO]: { color: 'bg-red-100 text-red-700 border-red-200' },
};

const ESTADO_DEFAULT: EstadoStyle = { color: 'bg-gray-100 text-gray-700 border-gray-200' };

export function getEstadoColor(idEstado: string): string {
  return (ESTADO_COLORS[idEstado] ?? ESTADO_DEFAULT).color;
}

export function formatFechaTicket(iso: string) {
  return new Date(iso).toLocaleString('es-MX', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}