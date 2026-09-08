import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCatalogo } from '../hooks/hooks';
import { CatalogoTable } from '../components/CatalogoTable';
import { CatalogoDetailSheet } from '../components/CatalogoDetailSheet';
import { CATALOGOS } from '../constants';
import { CatalogoCrearDialog } from '../components/CatalogoCrearDialog';

export function CatalogoDetailPage() {
  const { slug, id } = useParams<{ slug: string; id?: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, isFetching, refetch } = useCatalogo(slug!);

  const config = CATALOGOS.find((c) => c.slug === slug);

  return (
    <div className="space-y-4 p-6">
      <button
        onClick={() => navigate('/catalogos')}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a catálogos
      </button>

    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">{config?.label ?? slug}</h1>
      <div className="flex gap-2">
        {config && !config.soloLectura && <CatalogoCrearDialog config={config} />}
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching} className="gap-2">
          <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </div>
    </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {isError && <p className="text-destructive">No se pudo cargar el catálogo.</p>}

      {data && <CatalogoTable registros={data} columnasConfig={config?.columnas} slug={slug!} />}

      <CatalogoDetailSheet
        slug={slug!}
        id={id ?? null}
        registros={data ?? []}
        onClose={() => navigate(`/catalogos/${slug}`)}
      />
    </div>
  );
}