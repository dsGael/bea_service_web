import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CampoFormulario } from './CampoFormulario';
import {
  useAutobuses,
  useDispositivosPorAutobus,
  useFallasPorTipoDispositivo,
  usePrioridades,
  useCrearTicket,
} from '../hooks/hooks';

export function CrearTicketDialog() {
  const [open, setOpen] = useState(false);

  const [idautobus, setIdautobus] = useState('');
  const [iddispositivo, setIddispositivo] = useState('');
  const [idfalla, setIdfalla] = useState('');
  const [idprioridad, setIdprioridad] = useState('');
  const [comentarios, setComentarios] = useState('');

  const { data: autobuses, isLoading: loadingAutobuses } = useAutobuses();
  const { data: dispositivos, isLoading: loadingDispositivos } = useDispositivosPorAutobus(idautobus || null);
  const { data: prioridades } = usePrioridades();

  const dispositivoSeleccionado = dispositivos?.find((d) => d.idDispositivo === iddispositivo);
  const idDispositivoT = dispositivoSeleccionado?.idDispositivoT ?? null;

  const { data: fallas, isLoading: loadingFallas } = useFallasPorTipoDispositivo(idDispositivoT);

  const { mutate, isPending } = useCrearTicket();

  const resetForm = () => {
    setIdautobus('');
    setIddispositivo('');
    setIdfalla('');
    setIdprioridad('');
    setComentarios('');
  };

  const handleAutobusChange = (value: string) => {
    setIdautobus(value);
    setIddispositivo('');
    setIdfalla('');
  };

  const handleDispositivoChange = (value: string) => {
    setIddispositivo(value);
    setIdfalla('');
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
        idprioridad: idprioridad || undefined,
        comentarios: comentarios || undefined,
      },
      { onSuccess: () => { setOpen(false); resetForm(); } }
    );
  };

  const formValido = !!idautobus && !!iddispositivo && !!idfalla;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" /> Nuevo ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo ticket correctivo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CampoFormulario
            label="Autobús"
            tipo="combobox"
            requerido
            value={idautobus}
            onChange={handleAutobusChange}
            opciones={autobuses?.map((a) => ({ value: a.idAutobus, label: a.numeroEconomico ?? a.idAutobus })) ?? []}
            placeholder="Selecciona un autobús"
            searchPlaceholder="Buscar por número económico..."
            disabled={loadingAutobuses}
          />

          <CampoFormulario
            label="Dispositivo"
            tipo="combobox"
            requerido
            value={iddispositivo}
            onChange={handleDispositivoChange}
            opciones={
              dispositivos?.map((d) => ({
                value: d.idDispositivo,
                label: `${d.cat_dispositivo_t?.nombre ?? d.idDispositivoT} — ${d.numeroSerie ?? d.idDispositivo}`,
              })) ?? []
            }
            placeholder={idautobus ? 'Selecciona un dispositivo' : 'Primero elige un autobús'}
            searchPlaceholder="Buscar dispositivo..."
            disabled={!idautobus || loadingDispositivos}
          />

          <CampoFormulario
            label="Falla"
            tipo="combobox"
            requerido
            value={idfalla}
            onChange={setIdfalla}
            opciones={fallas?.map((f) => ({ value: f.idFalla, label: f.falla ?? f.nombre ?? f.idFalla })) ?? []}
            placeholder={iddispositivo ? 'Selecciona una falla' : 'Primero elige un dispositivo'}
            searchPlaceholder="Buscar falla..."
            disabled={!iddispositivo || loadingFallas}
          />

          <CampoFormulario
            label="Prioridad"
            tipo="combobox"
            value={idprioridad}
            onChange={setIdprioridad}
            opciones={prioridades?.map((p) => ({ value: p.idPrioridad, label: p.nombre ?? p.idPrioridad })) ?? []}
            placeholder="Selecciona prioridad"
            searchPlaceholder="Buscar prioridad..."
          />

          <CampoFormulario
            label="Comentarios"
            tipo="textarea"
            value={comentarios}
            onChange={setComentarios}
          />

          <Button type="submit" className="w-full" disabled={!formValido || isPending}>
            {isPending ? 'Creando…' : 'Crear ticket'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}