import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CatalogoForm } from './CatalogoForm';
import { useCrearRegistro } from '../hooks/hooks';
import { resolverCamposFormulario } from '../utils';
import type { CatalogoConfig } from '../constants';

export function CatalogoCrearDialog({ config }: Readonly<{ config: CatalogoConfig }>) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCrearRegistro(config.slug);
  const campos = resolverCamposFormulario(config, 'crear');

  const handleSubmit = (valores: Record<string, unknown>) => {
    mutate(valores, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Nuevo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo registro — {config.label}</DialogTitle>
        </DialogHeader>
        <CatalogoForm campos={campos} onSubmit={handleSubmit} isPending={isPending} submitLabel="Crear" />
      </DialogContent>
    </Dialog>
  );
}