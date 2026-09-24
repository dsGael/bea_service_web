import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table';
import type { MovimientoResumen } from '../types';

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleString('es-MX', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

export function MovimientosResumenTable({ movimientos }: { movimientos: MovimientoResumen[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Dispositivo</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Serie / IMEI</TableHead>
          <TableHead>Comentario</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movimientos.map((m) => (
          <TableRow key={m.idMovimiento}>
            <TableCell>{formatearFecha(m.fechaCreacion)}</TableCell>
            <TableCell className="capitalize">{m.tipoMovimiento}</TableCell>
            <TableCell>{m.dispositivo?.nombre ?? '—'}</TableCell>
            <TableCell>{m.cantidad}</TableCell>
            <TableCell>{m.numeroSerie ?? m.imei1 ?? m.imei2 ?? '—'}</TableCell>
            <TableCell className="max-w-64 truncate whitespace-normal">
              {m.comentario ?? '—'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}