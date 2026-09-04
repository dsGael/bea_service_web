// features/checador/hooks/hooks.ts
import { useMutation } from '@tanstack/react-query';
import { checadorApi } from '../api';
import { normalizarChecada, obtenerDeviceUUID } from '../utils';
import type { Checada } from '../types';


interface RegistrarChecadaInput {
  idUsuarioApp: string;
  nombre: string;
  lat: number;
  lng: number;
}

export function useRegistrarChecada() {
  return useMutation<Checada, unknown, RegistrarChecadaInput>({
    mutationFn: async ({ idUsuarioApp, nombre, lat, lng }) => {
      const ahoraUtc = new Date();
      const hora = ahoraUtc.toISOString().substring(11, 19); // "HH:mm:ss" en UTC

      const response = await checadorApi.registrar({
        idChecador: crypto.randomUUID(),
        idUsuario: idUsuarioApp,
        nombre,
        hora,
        fecha_hora: ahoraUtc.toISOString(),
        gps: { lat, lng },
        deviceUUID: obtenerDeviceUUID(),
      });

      return normalizarChecada(response);
    },
  });
}