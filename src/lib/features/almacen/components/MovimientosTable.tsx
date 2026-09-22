import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import type { Movimiento } from '../types';

function formatearFecha(iso: string) {
  return new Date(iso).toLocaleString('es-MX', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

export function MovimientosTable({ movimientos }: Readonly<{ movimientos: Movimiento[] }>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Dispositivo</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead>Origen</TableHead>
          <TableHead>Destino</TableHead>
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
            <TableCell>{m.almacenOrigen?.nombre ?? '—'}</TableCell>
            <TableCell>{m.almacenDestino?.nombre ?? '—'}</TableCell>
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