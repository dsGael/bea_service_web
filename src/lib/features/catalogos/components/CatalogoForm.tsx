import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { CampoFormulario } from '../types';

interface Props {
  campos: CampoFormulario[];
  valoresIniciales?: Record<string, unknown>;
  onSubmit: (valores: Record<string, unknown>) => void;
  isPending?: boolean;
  submitLabel?: string;
}

export function CatalogoForm({ campos, valoresIniciales, onSubmit, isPending, submitLabel }: Readonly<Props>) {
  const [valores, setValores] = useState<Record<string, unknown>>(() => {
    const base: Record<string, unknown> = {};
    for (const campo of campos) {
      base[campo.name] = valoresIniciales?.[campo.name] ?? (campo.tipo === 'boolean' ? false : '');
    }
    return base;
  });

  const setCampo = (name: string, value: unknown) => {
    setValores((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(valores);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {campos.map((campo) => (
        <div key={campo.name} className="space-y-1.5">
          <Label htmlFor={campo.name}>
            {campo.label}
            {campo.requerido && <span className="text-destructive"> *</span>}
          </Label>

          {campo.tipo === 'textarea' && (
            <Textarea
              id={campo.name}
              value={String(valores[campo.name] ?? '')}
              onChange={(e) => setCampo(campo.name, e.target.value)}
              required={campo.requerido}
            />
          )}

          {campo.tipo === 'text' && (
            <Input
              id={campo.name}
              type="text"
              value={String(valores[campo.name] ?? '')}
              onChange={(e) => setCampo(campo.name, e.target.value)}
              required={campo.requerido}
            />
          )}

          {campo.tipo === 'number' && (
            <Input
              id={campo.name}
              type="number"
              value={String(valores[campo.name] ?? '')}
              onChange={(e) => setCampo(campo.name, e.target.valueAsNumber)}
              required={campo.requerido}
            />
          )}

          {campo.tipo === 'date' && (
            <Input
              id={campo.name}
              type="date"
              value={String(valores[campo.name] ?? '')}
              onChange={(e) => setCampo(campo.name, e.target.value)}
              required={campo.requerido}
            />
          )}

          {campo.tipo === 'boolean' && (
            <Checkbox
              id={campo.name}
              checked={Boolean(valores[campo.name])}
              onCheckedChange={(checked) => setCampo(campo.name, checked)}
            />
          )}
        </div>
      ))}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Guardando…' : (submitLabel ?? 'Guardar')}
      </Button>
    </form>
  );
}