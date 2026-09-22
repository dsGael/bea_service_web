import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ComboboxBuscable, type OpcionCombobox } from './ComboboxBuscable';

type CampoTipo = 'combobox' | 'text' | 'textarea' | 'number';

interface Props {
  label: string;
  tipo: CampoTipo;
  value: string;
  onChange: (value: string) => void;
  opciones?: OpcionCombobox[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  requerido?: boolean;
  rows?: number; // solo aplica a textarea
}

export function CampoFormulario({
  label,
  tipo,
  value,
  onChange,
  opciones,
  placeholder,
  searchPlaceholder,
  disabled,
  requerido,
  rows,
}: Props) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        {requerido && <span className="text-destructive"> *</span>}
      </Label>

      {tipo === 'combobox' && (
        <ComboboxBuscable
          value={value}
          onChange={onChange}
          opciones={opciones ?? []}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          disabled={disabled}
        />
      )}

      {tipo === 'text' && (
        <Input value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
      )}

      {tipo === 'number' && (
        <Input type="number" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
      )}

      {tipo === 'textarea' && (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} rows={rows ?? 3} />
      )}
    </div>
  );
}