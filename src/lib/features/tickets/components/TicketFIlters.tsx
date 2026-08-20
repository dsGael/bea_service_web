// features/tickets/components/TicketFilters.tsx
import { Button } from '@/components/ui/button';
import { ESTADO_IDS } from '../constants';

interface Props {
  idEstadoActivo: string | undefined;
  onChange: (idestado: string | undefined) => void;
}

const FILTROS: { value: string | undefined; label: string }[] = [
  { value: undefined, label: 'Todos' },
  { value: ESTADO_IDS.VALIDACION_MC, label: 'Validación MC' },
  { value: ESTADO_IDS.ABIERTO, label: 'Abiertos' },
  { value: ESTADO_IDS.FINALIZADO, label: 'Finalizados' },
  { value: ESTADO_IDS.CANCELADO, label: 'Cancelados' },
];

export function TicketFilters({ idEstadoActivo, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTROS.map((f) => (
        <Button
          key={f.label}
          variant={idEstadoActivo === f.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </Button>
      ))}
    </div>
  );
}