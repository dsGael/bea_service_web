import { useSearchParams } from 'react-router-dom';
import { useMovimientos, useAlmacenes, useDispositivos } from '../hooks/hooks';
import { MovimientosTable } from '../components/MovimientosTable';
import { RegistrarMovimientoDialog } from '../components/RegistrarMovimientoDialog';

export function MovimientosListPage() {
  const [params] = useSearchParams();
  const idAlmacen = params.get('idAlmacen') ?? undefined;
  const idDispositivo = params.get('idDispositivo') ?? undefined;

  const { data: movimientos = [], isLoading } = useMovimientos({ idAlmacen, idDispositivo });
  const { data: almacenes = [] } = useAlmacenes();
  const { data: dispositivos = [] } = useDispositivos();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Movimientos</h1>
        <RegistrarMovimientoDialog almacenes={almacenes} dispositivos={dispositivos} />
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando...</p>
      ) : (
        <MovimientosTable movimientos={movimientos} />
      )}
    </div>
  );
}