import { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
  useReporta,
  useCategorias,
  useTecnicos,
  useRutas,
  useEmpresas,
  useEditarTicket,
} from '../hooks/hooks';

import { CampoFormulario } from '../../../core/forms/CampoFormulario';

interface Props {
  ticket: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditarTicketDialog({
  ticket,
  open,
  onOpenChange,
}: Readonly<Props>) {
  const [idautobus, setIdautobus] = useState('');
  const [numeroeconomico, setNumeroeconomico] = useState('');
  const [iddispositivo, setIddispositivo] = useState('');
  const [idfalla, setIdfalla] = useState('');
  const [idprioridad, setIdprioridad] = useState('');
  const [idruta, setIdruta] = useState('');
  const [idreporta, setIdreporta] = useState('');
  const [idempresa, setIdempresa] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [areatrabajo, setAreatrabajo] = useState('');
  const [idcategoria, setIdcategoria] = useState('');
  const [idtecnico, setIdtecnico] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [asuntoCorreo, setAsuntoCorreo] = useState('');
  const [favoritos, setFavoritos] = useState('');

  const [imagenes, setImagenes] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);

  const { data: empresas } = useEmpresas();
  const { data: autobuses } = useAutobuses();
  const { data: prioridades } = usePrioridades();
  const { data: reportas } = useReporta();
  const { data: categorias } = useCategorias();
  const { data: tecnicos } = useTecnicos();
  const { data: rutas } = useRutas();

  const {
    data: dispositivos,
    isLoading: loadingDispositivos,
  } = useDispositivosPorAutobus(idautobus || null);

  const dispositivoSeleccionado = dispositivos?.find(
    (d) => d.idDispositivo === iddispositivo,
  );

  const idDispositivoT =
    dispositivoSeleccionado?.idDispositivoT ?? null;

  const {
    data: fallas,
    isLoading: loadingFallas,
  } = useFallasPorTipoDispositivo(idDispositivoT);

  const { mutate, isPending } = useEditarTicket();

  useEffect(() => {
    if (!ticket || !open) return;

    setIdautobus(ticket.idautobus ?? '');
    setNumeroeconomico(ticket.numeroeconomico ?? '');
    setIddispositivo(ticket.iddispositivo ?? '');
    setIdfalla(ticket.idfalla ?? '');
    setIdprioridad(ticket.idprioridad ?? '');
    setIdruta(ticket.idruta ?? '');
    setIdreporta(ticket.idreporta ?? '');
    setIdempresa(ticket.idempresa ?? '');
    setDescripcion(ticket.descripcion ?? '');
    setAreatrabajo(ticket.areatrabajo ?? '');
    setIdcategoria(ticket.idcategoria ?? '');
    setIdtecnico(ticket.idtecnico ?? '');
    setComentarios(ticket.comentarios ?? '');
    setAsuntoCorreo(ticket.asunto_correo ?? '');
    setFavoritos(ticket.favoritos ?? '');

    setImagenes([]);
    setVideos([]);
  }, [ticket, open]);

  const handleAutobusChange = (value: string) => {
    setIdautobus(value);
    setIddispositivo('');
    setIdfalla('');

    const autobus = autobuses?.find(
      (a) => a.idAutobus === value,
    );

    setNumeroeconomico(
      autobus?.numeroEconomico ?? '',
    );
  };

  const handleDispositivoChange = (value: string) => {
    setIddispositivo(value);
    setIdfalla('');
  };

  const handleSubmit = (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('idautobus', idautobus);
    formData.append('numeroeconomico', numeroeconomico);
    formData.append('iddispositivo', iddispositivo);
    formData.append('idfalla', idfalla);

    if (idprioridad) {
      formData.append('idprioridad', idprioridad);
    }

    if (idruta) {
      formData.append('idruta', idruta);
    }

    if (idreporta) {
      formData.append('idreporta', idreporta);
    }

    if (idempresa) {
      formData.append('idempresa', idempresa);
    }

    if (idcategoria) {
      formData.append('idcategoria', idcategoria);
    }

    if (idtecnico) {
      formData.append('idtecnico', idtecnico);
    }

    if (descripcion) {
      formData.append('descripcion', descripcion);
    }

    if (areatrabajo) {
      formData.append('areatrabajo', areatrabajo);
    }

    if (comentarios) {
      formData.append('comentarios', comentarios);
    }

    if (asuntoCorreo) {
      formData.append('asunto_correo', asuntoCorreo);
    }

    if (favoritos) {
      formData.append('favoritos', favoritos);
    }

    imagenes.forEach((file) => {
      formData.append('evidenciasFalla', file);
    });

    videos.forEach((file) => {
      formData.append('evidenciasFalla', file);
    });

    mutate(
      {
        id: ticket.idticket,
        payload: formData,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar ticket</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          <CampoFormulario
            label="Autobús"
            tipo="combobox"
            requerido
            value={idautobus}
            onChange={handleAutobusChange}
            opciones={
              autobuses?.map((a) => ({
                value: a.idAutobus,
                label:
                  a.numeroEconomico ??
                  a.idAutobus,
              })) ?? []
            }
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
                label: `${
                  d.cat_dispositivo_t?.nombre ??
                  d.idDispositivoT
                } — ${
                  d.numeroSerie ??
                  d.idDispositivo
                }`,
              })) ?? []
            }
            disabled={
              !idautobus ||
              loadingDispositivos
            }
          />

          <CampoFormulario
            label="Falla"
            tipo="combobox"
            requerido
            value={idfalla}
            onChange={setIdfalla}
            opciones={
              fallas?.map((f) => ({
                value: f.idFalla,
                label:
                  f.falla ??
                  f.nombre ??
                  f.idFalla,
              })) ?? []
            }
            disabled={
              !iddispositivo ||
              loadingFallas
            }
          />

          <CampoFormulario
            label="Prioridad"
            tipo="combobox"
            value={idprioridad}
            onChange={setIdprioridad}
            opciones={
              prioridades?.map((p) => ({
                value: p.idPrioridad,
                label:
                  p.nombre ??
                  p.idPrioridad,
              })) ?? []
            }
          />

          <CampoFormulario
            label="Ruta"
            tipo="combobox"
            value={idruta}
            onChange={setIdruta}
            opciones={
              rutas?.map((r) => ({
                value: r.idRuta,
                label:
                  r.nombre ??
                  r.idRuta,
              })) ?? []
            }
          />

          <CampoFormulario
            label="Quién reporta"
            tipo="combobox"
            value={idreporta}
            onChange={setIdreporta}
            opciones={
              reportas?.map((r) => ({
                value: r.idReporta,
                label: r.nombre,
              })) ?? []
            }
          />

          <CampoFormulario
            label="Empresa"
            tipo="combobox"
            value={idempresa}
            onChange={setIdempresa}
            opciones={
              empresas?.map((e) => ({
                value: e.idEmpresa,
                label: e.nombre,
              })) ?? []
            }
          />

          <CampoFormulario
            label="Categoría"
            tipo="combobox"
            value={idcategoria}
            onChange={setIdcategoria}
            opciones={
              categorias?.map((c) => ({
                value: c.idCategoria,
                label: c.nombre,
              })) ?? []
            }
          />

          <CampoFormulario
            label="Técnico asignado"
            tipo="combobox"
            value={idtecnico}
            onChange={setIdtecnico}
            opciones={
              tecnicos?.map((t) => ({
                value: t.idUsuarioApp,
                label:
                  t.cat_empleados?.nombre ??
                  t.idUsuarioApp,
              })) ?? []
            }
          />

          <CampoFormulario
            label="Descripción"
            tipo="textarea"
            value={descripcion}
            onChange={setDescripcion}
          />

          <CampoFormulario
            label="Comentarios"
            tipo="textarea"
            value={comentarios}
            onChange={setComentarios}
          />

          <div className="space-y-1.5">
            <Label>Agregar imágenes de la falla</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setImagenes(
                  Array.from(
                    e.target.files ?? [],
                  ),
                )
              }
            />
          </div>

          <div className="space-y-1.5">
            <Label>Agregar videos de la falla</Label>
            <Input
              type="file"
              accept="video/*"
              multiple
              onChange={(e) =>
                setVideos(
                  Array.from(
                    e.target.files ?? [],
                  ),
                )
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              !idautobus ||
              !iddispositivo ||
              !idfalla ||
              isPending
            }
          >
            {isPending
              ? 'Guardando…'
              : 'Guardar cambios'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}