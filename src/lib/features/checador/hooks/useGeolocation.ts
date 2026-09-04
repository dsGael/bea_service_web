// features/checador/hooks/useGeolocation.ts
import { useState, useCallback } from 'react';

interface GeoState {
  lat: number | null;
  lng: number | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({
    lat: null,
    lng: null,
    loading: false,
    error: null,
  });

  const obtenerUbicacion = useCallback(() => {
    if (!navigator.geolocation) {
      setState((s) => ({ ...s, error: 'Tu navegador no soporta geolocalización.' }));
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          loading: false,
          error: null,
        });
      },
      (err) => {
        setState((s) => ({
          ...s,
          loading: false,
          error:
            err.code === err.PERMISSION_DENIED
              ? 'Debes permitir el acceso a tu ubicación para checar.'
              : 'No se pudo obtener tu ubicación.',
        }));
      },
      { enableHighAccuracy: true, timeout: 10_000 }
    );
  }, []);

  return { ...state, obtenerUbicacion };
}