import { useNavigate } from 'react-router-dom';
import { EstadoBadge } from './EstadoBadge';
import { formatFechaTicket } from '../utils';
import type { BinTicket } from '../types';

export function TicketTable({ tickets }: { tickets: BinTicket[] }) {
  const navigate = useNavigate();

  if (tickets.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
        No hay tickets con este filtro.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Folio</th>
            <th className="px-4 py-3 font-medium">Unidad</th>
            <th className="px-4 py-3 font-medium">Falla</th>
            <th className="px-4 py-3 font-medium">Técnico</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium">Fecha</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {tickets.map((t) => {
            const nombreTecnico = t.cat_tecnicos?.cat_empleados?.nombre ?? '—';
            const fallaTexto = t.cat_falla?.nombre ?? t.cat_falla?.descripcion ?? '—';

            return (
              <tr
                key={t.idticket}
                onClick={() => navigate(`/tickets/${t.idticket}`)}
                className="cursor-pointer hover:bg-muted/40 transition-colors"
              >
                <td className="px-4 py-3 font-mono font-medium">{t.folio}</td>
                <td className="px-4 py-3">{t.numeroeconomico ?? t.cat_autobus?.numeroeconomico ?? '—'}</td>
                <td className="max-w-xs truncate px-4 py-3">{fallaTexto}</td>
                <td className="px-4 py-3">{nombreTecnico}</td>
                <td className="px-4 py-3">
                  <EstadoBadge estado={t.estado} idestado={t.idestado} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatFechaTicket(t.fechacreacion)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}