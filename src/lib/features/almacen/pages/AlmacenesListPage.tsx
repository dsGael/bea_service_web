import { useAlmacenes } from '../hooks/hooks';
import { AlmacenesTable } from '../components/AlmacenesTable';
import { CrearAlmacenDialog } from '../components/CrearAlmacenDialog';

export function AlmacenesListPage() {
  const { data: almacenes = [], isLoading } = useAlmacenes();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Almacenes</h1>
        <CrearAlmacenDialog />
      </div>
      {isLoading ? <p className="text-sm text-muted-foreground">Cargando...</p> : <AlmacenesTable almacenes={almacenes} />}
    </div>
  );
}