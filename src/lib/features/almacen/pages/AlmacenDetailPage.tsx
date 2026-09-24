import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAlmacen, useActualizarAlmacen } from '../hooks/hooks';
import { CampoFormulario } from '@/lib/core/forms/CampoFormulario';
import { Button } from '@/components/ui/button';
import { MovimientosResumenTable } from '../components/MovimientosResumenTable';

import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table';

export function AlmacenDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: almacen, isLoading } = useAlmacen(id!);
  const actualizar = useActualizarAlmacen(id!);

  const [form, setForm] = useState({ nombre: '', ubicacion: '', responsable: '' });

  useEffect(() => {
    if (almacen) {
      setForm({ nombre: almacen.nombre, ubicacion: almacen.ubicacion, responsable: almacen.responsable });
    }
  }, [almacen]);

  if (isLoading || !almacen) return <p className="p-6 text-sm text-muted-foreground">Cargando...</p>;

  return (
    <div className="space-y-8 p-6">
      <Button variant="ghost" size="sm" render={<Link to="/almacen/almacenes" />}>
        <ArrowLeft className="h-4 w-4" />
        Volver a almacenes
      </Button>

      <div className="max-w-md space-y-3">
        <h1 className="text-2xl font-semibold">{almacen.nombre}</h1>
        <CampoFormulario label="Nombre" tipo="text" value={form.nombre} onChange={(v) => setForm((f) => ({ ...f, nombre: v }))} requerido />
        <CampoFormulario label="Ubicación" tipo="text" value={form.ubicacion} onChange={(v) => setForm((f) => ({ ...f, ubicacion: v }))} />
        <CampoFormulario label="Responsable" tipo="text" value={form.responsable} onChange={(v) => setForm((f) => ({ ...f, responsable: v }))} />
        <Button onClick={() => actualizar.mutate(form)} disabled={actualizar.isPending}>
          {actualizar.isPending ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </div>

      <div>
        <h2 className="mb-3 text-lg font-semibold">Dispositivos en este almacén</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Número de serie</TableHead>
              <TableHead>IMEI 1</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {almacen.dispositivos.map((d) => (
              <TableRow key={d.idDispositivo}>
                <TableCell>{d.cat_dispositivo_t?.nombre ?? '—'}</TableCell>
                <TableCell>{d.numeroSerie || '—'}</TableCell>
                <TableCell>{d.imei1 || '—'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

        <div>
            <h2 className="mb-3 text-lg font-semibold">Últimos movimientos</h2>
            <MovimientosResumenTable movimientos={almacen.movimientos} />
        </div>
    </div>
  );
}