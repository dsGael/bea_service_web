import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CampoFormulario } from '@/lib/core/forms/CampoFormulario';
import type { OpcionCombobox } from '@/lib/core/forms/ComboboxBuscable';
import type { AlmacenResumen, DispositivoResumen, TipoMovimiento } from '../types';
import { requiereSerieOImei } from '../constants';
import { useRegistrarMovimiento } from '../hooks/hooks';

interface Props {
  almacenes: AlmacenResumen[];
  dispositivos: DispositivoResumen[];
}

const TIPOS_MOVIMIENTO: OpcionCombobox[] = [
  { value: 'entrada', label: 'Entrada' },
  { value: 'salida', label: 'Salida' },
];

const ESTADO_INICIAL = {
  tipoMovimiento: '' as TipoMovimiento | '',
  idDispositivo: '',
  cantidad: '1',
  idAlmacenOrigen: '',
  idAlmacenDestino: '',
  numeroSerie: '',
  imei1: '',
  imei2: '',
  comentario: '',
};

export function RegistrarMovimientoDialog({ almacenes, dispositivos }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [error, setError] = useState<string | null>(null);
  const registrar = useRegistrarMovimiento();

  const opcionesAlmacen: OpcionCombobox[] = almacenes.map((a) => ({
    value: a.idAlmacen,
    label: a.nombre,
  }));
  const opcionesDispositivo: OpcionCombobox[] = dispositivos.map((d) => ({
    value: d.idDispositivoT,
    label: d.nombre,
  }));

  const dispositivoSeleccionado = dispositivos.find((d) => d.idDispositivoT === form.idDispositivo);
  const necesitaSerie = requiereSerieOImei(dispositivoSeleccionado);

  function actualizar<K extends keyof typeof form>(campo: K, valor: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function resetear() {
    setForm(ESTADO_INICIAL);
    setError(null);
  }

  async function handleSubmit() {
    setError(null);

    if (!form.tipoMovimiento || !form.idDispositivo || !form.idAlmacenOrigen || !form.idAlmacenDestino) {
      setError('Completa los campos obligatorios.');
      return;
    }
    if (form.idAlmacenOrigen === form.idAlmacenDestino) {
      setError('El almacén de origen y destino no pueden ser el mismo.');
      return;
    }
    const cantidad = Number(form.cantidad);
    if (!Number.isInteger(cantidad) || cantidad < 1) {
      setError('La cantidad debe ser un entero mayor a 0.');
      return;
    }
    if (necesitaSerie && !form.numeroSerie.trim()) {
      setError('Este dispositivo requiere número de serie.');
      return;
    }

    try {
      await registrar.mutateAsync({
        tipoMovimiento: form.tipoMovimiento,
        idDispositivo: form.idDispositivo,
        cantidad,
        idAlmacenOrigen: form.idAlmacenOrigen,
        idAlmacenDestino: form.idAlmacenDestino,
        numeroSerie: form.numeroSerie || undefined,
        imei1: form.imei1 || undefined,
        imei2: form.imei2 || undefined,
        comentario: form.comentario || undefined,
      });
      setOpen(false);
      resetear();
    } catch (e: any) {
      setError(e?.response?.data?.message ?? 'No se pudo registrar el movimiento.');
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetear();
      }}
    >
      <DialogTrigger render={<Button />}>Registrar movimiento</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar movimiento</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <CampoFormulario
            label="Tipo de movimiento"
            tipo="combobox"
            value={form.tipoMovimiento}
            onChange={(v) => actualizar('tipoMovimiento', v as TipoMovimiento)}
            opciones={TIPOS_MOVIMIENTO}
            requerido
          />
          <CampoFormulario
            label="Dispositivo"
            tipo="combobox"
            value={form.idDispositivo}
            onChange={(v) => actualizar('idDispositivo', v)}
            opciones={opcionesDispositivo}
            searchPlaceholder="Buscar dispositivo..."
            requerido
          />
          <CampoFormulario
            label="Cantidad"
            tipo="number"
            value={form.cantidad}
            onChange={(v) => actualizar('cantidad', v)}
            requerido
          />
          <CampoFormulario
            label="Almacén origen"
            tipo="combobox"
            value={form.idAlmacenOrigen}
            onChange={(v) => actualizar('idAlmacenOrigen', v)}
            opciones={opcionesAlmacen}
            requerido
          />
          <CampoFormulario
            label="Almacén destino"
            tipo="combobox"
            value={form.idAlmacenDestino}
            onChange={(v) => actualizar('idAlmacenDestino', v)}
            opciones={opcionesAlmacen}
            requerido
          />

          {necesitaSerie && (
            <CampoFormulario
              label="Número de serie"
              tipo="text"
              value={form.numeroSerie}
              onChange={(v) => actualizar('numeroSerie', v)}
              requerido
            />
          )}
          <CampoFormulario
            label="IMEI 1"
            tipo="text"
            value={form.imei1}
            onChange={(v) => actualizar('imei1', v)}
          />
          <CampoFormulario
            label="IMEI 2"
            tipo="text"
            value={form.imei2}
            onChange={(v) => actualizar('imei2', v)}
          />
          <CampoFormulario
            label="Comentario"
            tipo="textarea"
            value={form.comentario}
            onChange={(v) => actualizar('comentario', v)}
          />

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={registrar.isPending}>
            {registrar.isPending ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}