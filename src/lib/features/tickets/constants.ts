// features/tickets/constants.ts

export const ESTADO_IDS = {
  ABIERTO: 'ABI9e9uqgr',
  VALIDACION_MC: 'VALID123',
  FINALIZADO: 'FIN5c61e7',
  CANCELADO: 'CANb911e',
} as const;

export const AREAS_TRABAJO = [
  'En ruta',
  'Oficina Externa',
  'Patio de encierro',
  'Mesa de Control'
  // ajusta estos valores reales cuando los definas
] as const;

export const OPCIONES_IMPORTANTE = [
  'Despacho',
  'Favoritos'
] as const;


export type EstadoId = (typeof ESTADO_IDS)[keyof typeof ESTADO_IDS];