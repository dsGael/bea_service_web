import { Button } from '@/components/ui/button';
import { ESTADO_IDS } from '../constants';

interface Props {
  idEstadoActivo: string | undefined;
  onChange: (idestado: string | undefined) => void;
  conteos?: Record<string, number>;
}

const FILTROS: { value: string | undefined; label: string }[] = [
  { value: undefined, label: 'Todos' },
  { value: ESTADO_IDS.VALIDACION_MC, label: 'Validación MC' },
  { value: ESTADO_IDS.ABIERTO, label: 'Abiertos' },
  { value: ESTADO_IDS.FINALIZADO, label: 'Finalizados' },
  { value: ESTADO_IDS.CANCELADO, label: 'Cancelados' },
];

export function TicketFilters({ idEstadoActivo, onChange, conteos }: Readonly<Props>) {
  const totalTodos = conteos ? Object.values(conteos).reduce((a, b) => a + b, 0) : undefined;

  return (
    <div className="flex flex-wrap gap-2">
      {FILTROS.map((f) => {
        const count = f.value === undefined ? totalTodos : conteos?.[f.value];
        return (
          <Button
            key={f.label}
            variant={idEstadoActivo === f.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(f.value)}
            className="gap-1.5 text-md"
          >
            {f.label}
            {count !== undefined && (
              <span className=" pl-3 text-md ">
                 {count}
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
}