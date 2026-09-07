import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Loader2 } from 'lucide-react';
import { useCatalogoDetalle } from '../hooks/hooks';
import { CATALOGOS } from '../constants';

interface Props {
  slug: string;
  id: string | null;
  onClose: () => void;
}

function formatearValor(valor: unknown): string {
  if (valor === null || valor === undefined) return '—';
  if (typeof valor === 'boolean') return valor ? 'Sí' : 'No';
  if (typeof valor === 'object') return JSON.stringify(valor, null, 2);
  return String(valor);
}

export function CatalogoDetailSheet({ slug, id, onClose }: Props) {
  const isOpen = !!id;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto data-[side=right]:sm:max-w-2xl">
        {id && <DetalleContent slug={slug} id={id} />}
      </SheetContent>
    </Sheet>
  );
}

function DetalleContent({ slug, id }: { slug: string; id: string }) {
  const { data, isLoading, isError } = useCatalogoDetalle(slug, id);
  const config = CATALOGOS.find((c) => c.slug === slug);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="py-6 text-destructive">No se pudo cargar el registro.</div>;
  }

  return (
    <div className="space-y-4 px-0 sm:px-6 py-6">
      <SheetHeader className="text-left">
        <SheetTitle>{config?.label ?? slug}</SheetTitle>
      </SheetHeader>

      <dl className="space-y-3 text-md ">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="grid grid-cols-3 gap-2 border-b pb-2">
            <dt className="text-muted-foreground">{key}</dt>
            <dd className="col-span-2 px-3 wrap-break-word">{formatearValor(value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}