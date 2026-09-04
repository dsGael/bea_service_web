export interface ChecadorGps {
  lat: number;
  lng: number;
}

export interface RegistrarChecadaPayload {
  idChecador: string;
  idUsuario: string;
  nombre: string;
  hora: string; // "HH:mm:ss" en UTC
  fecha_hora: string; // ISO string UTC
  gps: ChecadorGps;
  deviceUUID: string;
}

export interface ChecadorResponse {
  idChecador: string;
  tipo?: string | null;
  HoraEntrada?: string | null;
  HoraSalida?: string | null;
  minutos_retardo?: string | number | null;
  horasLaboradas?: string | number | null;
  HorasExtras?: string | number | null; // 👈 nuevo
  estado?: string | null; // 👈 nuevo
}

export interface Checada {
  idChecador: string;
  tipo: 'entrada' | 'salida' | null;
  horaEntrada: Date | null;
  horaSalida: Date | null;
  minutosRetardo: number | null;
  horasLaboradas: number | null;
  horasExtras: number | null; // 👈 nuevo
  estado: string | null; // 👈 nuevo
}