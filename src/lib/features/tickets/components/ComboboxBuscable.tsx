import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

export interface OpcionCombobox {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  opciones: OpcionCombobox[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
}

export function ComboboxBuscable({
  value,
  onChange,
  opciones,
  placeholder = 'Selecciona una opción',
  searchPlaceholder = 'Buscar...',
  emptyText = 'Sin resultados.',
  disabled,
}: Props) {
  const [open, setOpen] = useState(false);

  const seleccionado = opciones.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        render={
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          />
        }
      >
        <span className={cn('truncate', !seleccionado && 'text-muted-foreground')}>
          {seleccionado?.label ?? placeholder}
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </PopoverTrigger>

      <PopoverContent className="w-(--anchor-width) p-0" align="start">
       <Command
            filter={(value, search) => {
                if (value.toLowerCase().includes(search.toLowerCase())) return 1;
                return 0;
            }}
            >
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
                <CommandEmpty>{emptyText}</CommandEmpty>
                <CommandGroup>
                {opciones.map((opcion) => (
                    <CommandItem
                    key={opcion.value}
                    value={opcion.label}
                    onSelect={() => {
                        onChange(opcion.value);
                        setOpen(false);
                    }}
                    >
                    <Check className={cn('mr-2 h-4 w-4', value === opcion.value ? 'opacity-100' : 'opacity-0')} />
                    {opcion.label}
                    </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
            </Command>
      </PopoverContent>
    </Popover>
  );
}