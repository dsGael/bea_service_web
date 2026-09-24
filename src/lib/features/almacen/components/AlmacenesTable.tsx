import { Link, useNavigate } from 'react-router-dom';
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table';
import type { Almacen } from '../types';

export function AlmacenesTable({ almacenes }: { almacenes: Almacen[] }) {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Ubicación</TableHead>
          <TableHead>Responsable</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {almacenes.map((a) => (
          <TableRow
            key={a.idAlmacen}
            className="cursor-pointer"
            onClick={() => navigate(`/almacen/almacenes/${a.idAlmacen}`)}
          >
            <TableCell>
              <Link
                to={`/almacen/almacenes/${a.idAlmacen}`}
                className="hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {a.nombre}
              </Link>
            </TableCell>
            <TableCell>{a.ubicacion || '—'}</TableCell>
            <TableCell>{a.responsable || '—'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}