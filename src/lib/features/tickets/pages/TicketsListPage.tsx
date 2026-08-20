import { useState } from 'react';
import { TicketTable } from '../components/TicketTable';
import { ESTADO_IDS } from '../constants';
import { Loader2 } from 'lucide-react';
import { useTickets } from '../hooks/hooks';
import { TicketFilters } from '../components/TicketFIlters';

export function TicketsListPage() {
  const [idestado, setIdestado] = useState<string | undefined>(ESTADO_IDS.VALIDACION_MC);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useTickets({
    idestado,
    page,
    limit: 20,
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mesa de Control</h1>
        {isFetching && !isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
      </div>

      <TicketFilters
        idEstadoActivo={idestado}
        onChange={(v) => {
          setIdestado(v);
          setPage(1);
        }}
      />

      {isLoading && <p className="text-muted-foreground">Cargando tickets…</p>}
      {isError && <p className="text-destructive">Error al cargar tickets.</p>}

      {data && (
        <>
          <TicketTable tickets={data.data} />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Total: {data.meta.total}</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="disabled:opacity-40">
                Anterior
              </button>
              <span>Página {page} de {data.meta.totalPages}</span>
              <button
                disabled={page >= data.meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}