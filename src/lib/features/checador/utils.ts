import type { ChecadorResponse, Checada } from './types';

export function normalizarChecada(json: ChecadorResponse): Checada {
  return {
    idChecador: json.idChecador,
    tipo: (json.tipo?.toLowerCase() as Checada['tipo']) ?? null,
    horaEntrada: json.HoraEntrada ? new Date(json.HoraEntrada) : null,
    horaSalida: json.HoraSalida ? new Date(json.HoraSalida) : null,
    minutosRetardo:
      json.minutos_retardo !== null && json.minutos_retardo !== undefined
        ? Number(json.minutos_retardo)
        : null,
    horasLaboradas:
      json.horasLaboradas !== null && json.horasLaboradas !== undefined
        ? Number(json.horasLaboradas)
        : null,
    horasExtras:
      json.HorasExtras !== null && json.HorasExtras !== undefined
        ? Number(json.HorasExtras)
        : null,
    estado: json.estado ?? null,
  };
}



// features/checador/utils/device-id.ts
const DEVICE_ID_KEY = 'checador_device_uuid';

export function obtenerDeviceUUID(): string {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

