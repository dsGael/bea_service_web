import { Link } from 'react-router-dom';
import type { SubmoduloAlmacen } from '../constants';

export function AlmacenTile({ submodulo }: { submodulo: SubmoduloAlmacen }) {
  const Icon = submodulo.icon;

  return (
    <Link
      to={`/almacen/${submodulo.slug}`}
      className="group flex min-h-56 flex-col items-center justify-center gap-4 rounded-xl border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:bg-muted/50 hover:shadow-md"
    >
      <div className="rounded-full bg-muted p-5 transition-colors group-hover:bg-background">
        <Icon className="h-10 w-10 text-muted-foreground group-hover:text-foreground" />
      </div>
      <div className="space-y-1">
        <span className="text-lg font-semibold">{submodulo.label}</span>
        <p className="text-sm text-muted-foreground">{submodulo.descripcion}</p>
      </div>
    </Link>
  );
}