import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useAutobuses,
  useDispositivosPorAutobus,
  useFallasPorTipoDispositivo,
  usePrioridades,
  useCrearTicket,
} from '../hooks/hooks';

export function CrearTicketDialog() {
  const [open, setOpen] = useState(false);

  const [idautobus, setIdautobus] = useState<string | null>(null);
  const [iddispositivo, setIddispositivo] = useState<string | null>(null);
  const [idfalla, setIdfalla] = useState<string | null>(null);
  const [idprioridad, setIdprioridad] = useState<string | null>(null);
  const [comentarios, setComentarios] = useState('');

  const { data: autobuses, isLoading: loadingAutobuses } = useAutobuses();
  const { data: dispositivos, isLoading: loadingDispositivos } = useDispositivosPorAutobus(idautobus);
  const { data: prioridades } = usePrioridades();

  const dispositivoSeleccionado = dispositivos?.find((d) => d.idDispositivo === iddispositivo);
  const idDispositivoT = dispositivoSeleccionado?.idDispositivoT ?? null;

  const { data: fallas, isLoading: loadingFallas } = useFallasPorTipoDispositivo(idDispositivoT);

  const { mutate, isPending } = useCrearTicket();

  const resetForm = () => {
    setIdautobus(null);
    setIddispositivo(null);
    setIdfalla(null);
    setIdprioridad(null);
    setComentarios('');
  };

  const handleAutobusChange = (value: string | null) => {
    setIdautobus(value);
    setIddispositivo(null); // resetea los dependientes
    setIdfalla(null);
  };

  const handleDispositivoChange = (value: string | null) => {
    setIddispositivo(value);
    setIdfalla(null); // resetea el dependiente
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idautobus || !iddispositivo || !idDispositivoT || !idfalla) return;

    mutate(
      {
        idautobus,
        iddispositivo,
        iddispositivot: idDispositivoT,
        idfalla,
        idprioridad: idprioridad ?? undefined,
        comentarios: comentarios || undefined,
      },
      {
        onSuccess: () => {
          setOpen(false);
          resetForm();
        },
      }
    );
  };

  const formValido = !!idautobus && !!iddispositivo && !!idfalla;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Nuevo ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo ticket correctivo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Autobús *</Label>
            <Select value={idautobus ?? undefined} onValueChange={handleAutobusChange} disabled={loadingAutobuses}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un autobús" />
              </SelectTrigger>
              <SelectContent>
                {autobuses?.map((a) => (
                  <SelectItem key={a.idAutobus} value={a.idAutobus}>
                    {a.numeroEconomico ?? a.idAutobus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Dispositivo *</Label>
            <Select
              value={iddispositivo ?? undefined}
              onValueChange={handleDispositivoChange}
              disabled={!idautobus || loadingDispositivos}
            >
              <SelectTrigger>
                <SelectValue placeholder={idautobus ? 'Selecciona un dispositivo' : 'Primero elige un autobús'} />
              </SelectTrigger>
              <SelectContent>
                {dispositivos?.map((d) => (
                  <SelectItem key={d.idDispositivo} value={d.idDispositivo}>
                    {d.cat_dispositivo_t?.nombre ?? d.idDispositivoT} — {d.numeroSerie ?? d.idDispositivo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Falla *</Label>
            <Select
              value={idfalla ?? undefined}
              onValueChange={setIdfalla}
              disabled={!iddispositivo || loadingFallas}
            >
              <SelectTrigger>
                <SelectValue placeholder={iddispositivo ? 'Selecciona una falla' : 'Primero elige un dispositivo'} />
              </SelectTrigger>
              <SelectContent>
                {fallas?.map((f) => (
                  <SelectItem key={f.idFalla} value={f.idFalla}>
                    {f.falla ?? f.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Prioridad</Label>
            <Select value={idprioridad ?? undefined} onValueChange={setIdprioridad}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona prioridad" />
              </SelectTrigger>
              <SelectContent>
                {prioridades?.map((p) => (
                  <SelectItem key={p.idPrioridad} value={p.idPrioridad}>
                    {p.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Comentarios</Label>
            <Textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)} rows={3} />
          </div>

          <Button type="submit" className="w-full" disabled={!formValido || isPending}>
            {isPending ? 'Creando…' : 'Crear ticket'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}