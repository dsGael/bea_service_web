import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Loader2 } from 'lucide-react';
import { formatFechaTicket } from '../utils';
import { useTicketDetail } from '../hooks/hooks';
import { EstadoBadge } from './EstadoBadge';
import { EvidenciaGallery } from './EvidenciaGallery';

interface Props {
  ticketId: string | null;
  onClose: () => void;
}

export function TicketDetailSheet({ ticketId, onClose }: Props) {
  const isOpen = !!ticketId;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto data-[side=right]:sm:max-w-4xl">
          {ticketId && <TicketDetailContent ticketId={ticketId} />}
      </SheetContent>
    </Sheet>
  );
}

function TicketDetailContent({ ticketId }: { ticketId: string }) {
  const { data: ticket, isLoading, isError } = useTicketDetail(ticketId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !ticket) {
    return <div className="py-6 text-destructive">No se pudo cargar el ticket.</div>;
  }

  const detalle = ticket.bin_ticket_detail?.[ticket.bin_ticket_detail.length - 1];
  const nombreTecnico = ticket.cat_tecnicos?.cat_empleados?.nombre ?? '—';
  const nombreFalla = ticket.cat_falla?.nombre ?? ticket.cat_falla?.falla ?? '—';
  const unidad = ticket.numeroeconomico ?? ticket.cat_autobus?.numeroEconomico ?? '—';

  const evidenciaFalla = [...(ticket.imagenfalla1 ?? []), ...(ticket.video ?? [])];
  const evidenciaReparacion = [...(detalle?.imagen1 ?? []), ...(detalle?.video ?? [])];

  return (
    <div className="space-y-6 h-0 flex-1 overflow-y-auto p-6 w-full">
      <SheetHeader className="space-y-2 text-left">
        <div className="flex items-start justify-between gap-2">
          <SheetTitle className="text-xl">{ticket.folio}</SheetTitle>
          <EstadoBadge estado={ticket.estado} idestado={ticket.idestado} />
        </div>
        <p className="text-sm text-muted-foreground">
          {unidad} · Creado el {formatFechaTicket(ticket.fechacreacion)}
        </p>
      </SheetHeader>

      <section className="grid grid-cols-2 gap-4 rounded-lg border p-4 text-sm">
        <div>
          <p className="text-muted-foreground">Falla reportada</p>
          <p className="font-medium">{nombreFalla}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Técnico asignado</p>
          <p className="font-medium">{nombreTecnico}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Prioridad</p>
          <p className="font-medium">{ticket.cat_prioridad?.nombre ?? '—'}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Dispositivo</p>
          <p className="font-medium">{ticket.cat_dispositivo_t?.nombre ?? '—'}</p>
        </div>
        {ticket.comentarios && (
          <div className="col-span-2">
            <p className="text-muted-foreground">Comentario original</p>
            <p className="font-medium">{ticket.comentarios}</p>
          </div>
        )}
      </section>

      {detalle && (
        <section className="space-y-3 rounded-lg border p-4">
          <h2 className="font-medium">Diagnóstico y reparación</h2>
          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground">Diagnóstico</p>
              <p>{detalle.cat_diagnostico?.diagnostico ?? 'Sin diagnóstico registrado'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Reparación realizada</p>
              <p>{detalle.Reparacion ?? '—'}</p>
            </div>
            {detalle.comentarios && (
              <div className="sm:col-span-2">
                <p className="text-muted-foreground">Comentarios del técnico</p>
                <p>{detalle.comentarios}</p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <EvidenciaGallery titulo="Evidencia de la falla" urls={evidenciaFalla} />
        <EvidenciaGallery titulo="Evidencia de la reparación" urls={evidenciaReparacion} />
      </section>

      {/* <ValidacionPanel ticket={ticket} /> */}
    </div>
  );
}