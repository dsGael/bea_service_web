import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { CATALOGOS } from '../constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CatalogoForm } from './CatalogoForm';
import { resolverCamposFormulario } from '../utils';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useActualizarRegistro } from '../hooks/hooks';

interface Props {
  slug: string;
  id: string | null;
  registros: Record<string, unknown>[];
  onClose: () => void;
}

function formatearValor(key: string, valor: unknown): string {
  if (valor === null || valor === undefined) return '—';
  if (typeof valor === 'boolean') return valor ? 'Sí' : 'No';

  // 1. Si la clave parece una fecha o el valor es un objeto Date
  const esCampoFecha = /fecha|created|updated|at$/i.test(key);

  if (valor instanceof Date || (typeof valor === 'string' && esCampoFecha)) {
    const fecha = new Date(valor);
    // Verificar que sea una fecha válida antes de formatear
    if (!Number.isNaN(fecha.getTime())) {
      return new Intl.DateTimeFormat('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(fecha);
      // Resultado: "03/03/2026, 14:05:03"
    }
  }

  if (typeof valor === 'object') return JSON.stringify(valor, null, 2);
  return String(valor);
}

// misma heurística que ya usa CatalogoTable para encontrar el campo "id"
function resolverKeyField(registros: Record<string, unknown>[], columnasConfig?: string[]) {
  if (registros.length === 0) return null;
  const columnas = columnasConfig ?? Object.keys(registros[0]);
  return columnas.find((c) => c.toLowerCase().startsWith('id')) ?? columnas[0];
}

export function CatalogoDetailSheet({ slug, id, registros, onClose }: Readonly<Props>) {
  const isOpen = !!id;
  const config = CATALOGOS.find((c) => c.slug === slug);
  const keyField = resolverKeyField(registros, config?.columnas);
  const registro = keyField ? registros.find((r) => String(r[keyField]) === id) : undefined;

  const [editando, setEditando] = useState(false);
  const { mutate, isPending } = useActualizarRegistro(slug);

  const handleEditar = (valores: Record<string, unknown>) => {
    if (!id) return;
    mutate({ id, dto: valores }, { onSuccess: () => setEditando(false) });
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <SheetContent className="w-full overflow-y-auto data-[side=right]:sm:max-w-3xl">
          {registro ? (
            <div className="space-y-4 p-8">
              <SheetHeader className="flex-row items-center justify-between space-y-0 text-left">
                <SheetTitle>{config?.label ?? slug}</SheetTitle>
                {config && !config.soloLectura && (
                  <Button variant="outline" size="sm" onClick={() => setEditando(true)} className="gap-2">
                    <Pencil className="h-3.5 w-3.5" /> Editar
                  </Button>
                )}
              </SheetHeader>

              <dl className="space-y-3 text-sm">
                {Object.entries(registro).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 gap-2 border-b pb-2">
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="col-span-2 wrap-break-word">{formatearValor(key,value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : (
            id && <div className="py-6 text-muted-foreground">Registro no encontrado.</div>
          )}
        </SheetContent>
      </Sheet>

      {config && registro && (
        <Dialog open={editando} onOpenChange={setEditando}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar — {config.label}</DialogTitle>
            </DialogHeader>
            <CatalogoForm
              campos={resolverCamposFormulario(config, 'editar')}
              valoresIniciales={registro}
              onSubmit={handleEditar}
              isPending={isPending}
              submitLabel="Guardar cambios"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}