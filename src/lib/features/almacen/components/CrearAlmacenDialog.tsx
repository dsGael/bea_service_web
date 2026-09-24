import { useState } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CampoFormulario } from '@/lib/core/forms/CampoFormulario';
import { useCrearAlmacen } from '../hooks/hooks';

const ESTADO_INICIAL = { nombre: '', ubicacion: '', responsable: '' };

export function CrearAlmacenDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [error, setError] = useState<string | null>(null);
  const crear = useCrearAlmacen();

  function actualizar<K extends keyof typeof form>(campo: K, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function handleSubmit() {
    setError(null);
    if (!form.nombre.trim()) {
      setError('El nombre es obligatorio.');
      return;
    }
    try {
      await crear.mutateAsync({
        nombre: form.nombre,
        ubicacion: form.ubicacion || undefined,
        responsable: form.responsable || undefined,
      });
      setOpen(false);
      setForm(ESTADO_INICIAL);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? 'No se pudo crear el almacén.');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>Nuevo almacén</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo almacén</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <CampoFormulario label="Nombre" tipo="text" value={form.nombre} onChange={(v) => actualizar('nombre', v)} requerido />
          <CampoFormulario label="Ubicación" tipo="text" value={form.ubicacion} onChange={(v) => actualizar('ubicacion', v)} />
          <CampoFormulario label="Responsable" tipo="text" value={form.responsable} onChange={(v) => actualizar('responsable', v)} />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={crear.isPending}>
            {crear.isPending ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}