import { SUBMODULOS_ALMACEN } from '../constants';
import { AlmacenTile } from '../components/AlmacenTile';

export function AlmacenPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Almacén</h1>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SUBMODULOS_ALMACEN.map((s) => (
          <AlmacenTile key={s.slug} submodulo={s} />
        ))}
      </div>
    </div>
  );
}