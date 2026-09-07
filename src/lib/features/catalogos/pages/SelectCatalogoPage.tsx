import { CATALOGOS } from '../constants';
import { CatalogoTile } from '../components/CatalogoTile';

export function SelectCatalogoPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Catálogos</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {CATALOGOS.map((cat) => (
          <CatalogoTile key={cat.slug} catalogo={cat} />
        ))}
      </div>
    </div>
  );
}