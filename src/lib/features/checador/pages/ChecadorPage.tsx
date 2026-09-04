import { useEffect } from 'react';
import { MapPin, Fingerprint, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGeolocation } from '../hooks/useGeolocation';
import { useRegistrarChecada } from '../hooks/hooks';
import { useAuth } from '@/lib/core/auth/auth-context';
import { useChecadorCooldown } from '../hooks/useChecadorCooldown';

export function ChecadorPage() {
    const { usuario } = useAuth(); // idUsuarioApp, nombre — ajusta a tu shape real
    const { lat, lng, loading: loadingGeo, error: geoError, obtenerUbicacion } = useGeolocation();
    const { mutate, isPending, isSuccess, isError, error, data } = useRegistrarChecada();
    const { enCooldown, registrarChecadaExitosa } = useChecadorCooldown(); 

  useEffect(() => {
    obtenerUbicacion();
  }, [obtenerUbicacion]);

const handleChecar = () => {
  if (lat === null || lng === null || !usuario || enCooldown) return; 

  mutate(
    { idUsuarioApp: usuario.idUsuarioApp, nombre: usuario.nombre, lat, lng },
    { onSuccess: registrarChecadaExitosa } 
  );
};

  const ahora = new Date();

  return (
    <div className="mx-auto max-w-md space-y-6 p-6">
      <h1 className="text-xl font-semibold">Checador</h1>

      {/* Estado de ubicación */}
      <div className="flex items-center justify-center rounded-lg border bg-muted/30 py-16 text-muted-foreground">
        {loadingGeo ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Obteniendo ubicación…</span>
          </div>
        ) : (
          <MapPin className="h-8 w-8" />
        )}
      </div>

      {geoError && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          <XCircle className="h-4 w-4 shrink-0" />
          {geoError}
        </div>
      )}

      {isError && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          <XCircle className="h-4 w-4 shrink-0" />
          {/* ajusta según cómo expone tu apiClient el mensaje del backend */}
          {(error as any)?.response?.data?.message ?? 'No se pudo registrar tu checada.'}
        </div>
      )}

        {isSuccess && data && (
            <div className="space-y-2 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
                <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span className="font-medium">
                    {data.tipo === 'entrada'
                    ? 'Entrada registrada correctamente.'
                    : data.tipo === 'salida'
                        ? 'Salida registrada correctamente.'
                        : 'Checada guardada correctamente.'}
                </span>
                </div>

                {data.minutosRetardo !== null && data.minutosRetardo > 0 && (
                <p className="text-amber-700">
                    Tuviste un retardo de {data.minutosRetardo} minuto{data.minutosRetardo === 1 ? '' : 's'}.
                </p>
                )}

                {data.horasLaboradas !== null && data.horasLaboradas< 0 && (
                <p>
                    Horas laboradas: <span className="font-semibold">{data.horasLaboradas.toFixed(2)}</span>
                </p>
                )}
            </div>
        )}
        
        {enCooldown && (
        <div className="flex items-center gap-2 rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-700">
            <Loader2 className="h-4 w-4 shrink-0" />
            Ya registraste tu checada. Espera unos minutos antes de volver a checar.
        </div>
        )}

        

      <div className="space-y-1 text-center">
        <p className="text-lg font-semibold">{usuario?.nombre}</p>
        <p className="text-sm text-muted-foreground">{usuario?.perfil}</p>
      </div>

      <div className="space-y-1 text-center">
        <p className="text-3xl font-bold tabular-nums text-primary">
          {ahora.toLocaleTimeString('es-MX')}
        </p>
        <p className="text-sm text-muted-foreground">
          {ahora.toLocaleDateString('es-MX')}
        </p>
      </div>

      <Button
        size="lg"
        className="w-full gap-2 bg-green-600 hover:bg-green-700"
        disabled={isPending || loadingGeo || lat === null || enCooldown}
        onClick={handleChecar}
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Fingerprint className="h-4 w-4" />}
        CHECAR
      </Button>
    </div>
  );
}