// features/tickets/components/EstadoBadge.tsx
import { cn } from '@/lib/utils';
import { getEstadoColor } from '../utils';
import type { EstadoRelacion } from '../types';

export function EstadoBadge({ estado, idestado }: { estado?: EstadoRelacion | null; idestado: string }) {
  const nombre = estado?.nombre ?? idestado;
  const color = getEstadoColor(estado?.idEstadoR ?? idestado);

  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium', color)}>
      {nombre}
    </span>
  );
}