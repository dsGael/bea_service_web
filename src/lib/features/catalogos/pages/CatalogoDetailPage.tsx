import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useCatalogo } from '../hooks/hooks';
import { CatalogoTable } from '../components/CatalogoTable';
import { CATALOGOS } from '../constants';

export function CatalogoDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCatalogo(slug!);

  const config = CATALOGOS.find((c) => c.slug === slug);

  return (
    <div className="space-y-4 p-6">
      <button
        onClick={() => navigate('/catalogos')}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a catálogos
      </button>

      <h1 className="text-2xl font-semibold">{config?.label ?? slug}</h1>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && <p className="text-destructive">No se pudo cargar el catálogo.</p>}

      {data && <CatalogoTable registros={data} />}
    </div>
  );
}