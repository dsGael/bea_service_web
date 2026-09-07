import { Link } from 'react-router-dom';
import { Boxes } from 'lucide-react';
import type { CatalogoConfig } from '../constants';

export function CatalogoTile({ catalogo }: { catalogo: CatalogoConfig }) {
  return (
    <Link
      to={`/catalogos/${catalogo.slug}`}
      className="flex flex-col items-center justify-center gap-2 rounded-lg border p-6 text-center transition-colors hover:bg-muted/50"
    >
      <Boxes className="h-6 w-6 text-muted-foreground" />
      <span className="text-sm font-medium">{catalogo.label}</span>
      {catalogo.soloLectura && (
        <span className="text-xs text-muted-foreground">Solo lectura</span>
      )}
    </Link>
  );
}