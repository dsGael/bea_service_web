// features/tickets/constants.ts

export const ESTADO_IDS = {
  ABIERTO: 'ABI9e9uqgr',
  VALIDACION_MC: 'VALID123',
  FINALIZADO: 'FIN5c61e7',
  CANCELADO: 'CANb911e',
} as const;

export type EstadoId = (typeof ESTADO_IDS)[keyof typeof ESTADO_IDS];