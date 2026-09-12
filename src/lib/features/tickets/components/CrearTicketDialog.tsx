import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { AREAS_TRABAJO, OPCIONES_IMPORTANTE } from '../constants';
import {
  useAutobuses,
  useDispositivosPorAutobus,
  useFallasPorTipoDispositivo,
  usePrioridades,
  useReporta,
  useCategorias,
  useTecnicos,
  useRutas,
  useAsignacionReciente,
  useCrearTicket,
} from '../hooks/hooks';
import { CampoFormulario } from '../components/CampoFormulario';

function ahoraLocalISO() {
  // datetime-local necesita "YYYY-MM-DDTHH:mm", sin zona horaria
  const ahora = new Date();
  ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
  return ahora.toISOString().slice(0, 16);
}

export function CrearTicketDialog() {
  const [open, setOpen] = useState(false);

  const [idautobus, setIdautobus] = useState('');
  const [numeroeconomico, setNumeroeconomico] = useState('');
  const [iddispositivo, setIddispositivo] = useState('');
  const [idfalla, setIdfalla] = useState('');
  const [idprioridad, setIdprioridad] = useState('');
  const [fecha, setFecha] = useState(ahoraLocalISO());
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

  const { data: autobuses, isLoading: loadingAutobuses } = useAutobuses();
  const { data: dispositivos, isLoading: loadingDispositivos } = useDispositivosPorAutobus(idautobus || null);
  const { data: prioridades } = usePrioridades();
  const { data: reportas } = useReporta();
  const { data: categorias } = useCategorias();
  const { data: tecnicos } = useTecnicos();
  const { data: rutas } = useRutas();

  const dispositivoSeleccionado = dispositivos?.find((d) => d.idDispositivo === iddispositivo);
  const idDispositivoT = dispositivoSeleccionado?.idDispositivoT ?? null;
  const { data: fallas, isLoading: loadingFallas } = useFallasPorTipoDispositivo(idDispositivoT);

  const { data: asignacion } = useAsignacionReciente(numeroeconomico || null);

  // autorellenar ruta cuando llega la asignación, solo si hay match real contra el catálogo
  useEffect(() => {
    if (!asignacion?.LINEA || !rutas) return;
    const match = rutas.find((r) => String(r.nombre) === String(asignacion.LINEA));
    if (match) setIdruta(match.idRuta);
    // si no hay match, se deja vacío — el usuario elige manualmente
  }, [asignacion, rutas]);

  const reportaSeleccionado = reportas?.find((r) => r.idReporta === idreporta);

  // autorellenar empresa cuando se elige quién reporta, pero permite editarlo después
  useEffect(() => {
    if (reportaSeleccionado?.idEmpresa) {
      setIdempresa(reportaSeleccionado.idEmpresa);
    }
  }, [reportaSeleccionado]);

  const { mutate, isPending } = useCrearTicket();

  const handleAutobusChange = (value: string) => {
    setIdautobus(value);
    setIddispositivo('');
    setIdfalla('');
    const autobus = autobuses?.find((a) => a.idAutobus === value);
    setNumeroeconomico(autobus?.numeroEconomico ?? '');
  };

  const handleDispositivoChange = (value: string) => {
    setIddispositivo(value);
    setIdfalla('');
  };

  const resetForm = () => {
    setIdautobus('');
    setNumeroeconomico('');
    setIddispositivo('');
    setIdfalla('');
    setIdprioridad('');
    setFecha(ahoraLocalISO());
    setIdruta('');
    setIdreporta('');
    setIdempresa('');
    setDescripcion('');
    setAreatrabajo('');
    setIdcategoria('');
    setIdtecnico('');
    setComentarios('');
    setAsuntoCorreo('');
    setFavoritos('');
    setImagenes([]);
    setVideos([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idautobus || !iddispositivo || !idDispositivoT || !idfalla) return;

    mutate(
      {
        idautobus,
        numeroeconomico,
        iddispositivo,
        iddispositivot: idDispositivoT,
        idfalla,
        idprioridad: idprioridad || undefined,
        idruta: idruta || undefined,
        idreporta: idreporta || undefined,
        idempresa: idempresa || undefined,
        idcategoria: idcategoria || undefined,
        idtecnico: idtecnico || undefined,
        fecha: fecha ? new Date(fecha).toISOString() : undefined,
        descripcion: descripcion || undefined,
        areatrabajo: areatrabajo || undefined,
        comentarios: comentarios || undefined,
        asunto_correo: asuntoCorreo || undefined,
        favoritos: favoritos || undefined,
        imagenes,
        videos,
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
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nuevo ticket correctivo</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Registro de falla</Label>
            <Input type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>

          <CampoFormulario
            label="Autobús"
            tipo="combobox"
            requerido
            value={idautobus}
            onChange={handleAutobusChange}
            opciones={autobuses?.map((a) => ({ value: a.idAutobus, label: a.numeroEconomico ?? a.idAutobus })) ?? []}
            placeholder="Selecciona un autobús"
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
            disabled={!iddispositivo || loadingFallas}
          />

          <CampoFormulario
            label="Ruta"
            tipo="combobox"
            value={idruta}
            onChange={setIdruta}
            opciones={rutas?.map((r) => ({ value: r.idRuta, label: r.nombre ?? r.idRuta })) ?? []}
            placeholder={asignacion ? 'Autorellenada — puedes cambiarla' : 'Selecciona una ruta'}
          />

          <CampoFormulario
            label="Prioridad"
            tipo="combobox"
            value={idprioridad}
            onChange={setIdprioridad}
            opciones={prioridades?.map((p) => ({ value: p.idPrioridad, label: p.nombre ?? p.idPrioridad })) ?? []}
            placeholder="Selecciona prioridad"
          />

          <CampoFormulario
            label="Quién reporta"
            tipo="combobox"
            value={idreporta}
            onChange={setIdreporta}
            opciones={reportas?.map((r) => ({ value: r.idReporta, label: r.nombre })) ?? []}
            placeholder="Selecciona quién reporta"
          />

          <CampoFormulario
            label="Empresa de quien reporta"
            tipo="combobox"
            value={idempresa}
            onChange={setIdempresa}
            opciones={reportas?.map((r) => r.cat_empresa).filter(Boolean).map((e) => ({ value: e!.idEmpresa, label: e!.nombre })) ?? []}
            placeholder="Autorellenada — puedes cambiarla"
          />

          <CampoFormulario label="Descripción" tipo="textarea" value={descripcion} onChange={setDescripcion} />

          <div className="space-y-1.5">
            <Label>Área de trabajo</Label>
            <Select value={areatrabajo || undefined} onValueChange={(value) => setAreatrabajo(value ?? "")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona área">
                  {(value: string) => value}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {AREAS_TRABAJO.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Categoría</Label>
            <Select value={idcategoria || undefined} onValueChange={(value) => setIdcategoria(value ?? "")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona categoría">
                  {(value: string) => categorias?.find((c) => c.idCategoria === value)?.nombre ?? value}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categorias?.map((c) => (
                  <SelectItem key={c.idCategoria} value={c.idCategoria}>{c.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <CampoFormulario
            label="Técnico asignado"
            tipo="combobox"
            value={idtecnico}
            onChange={setIdtecnico}
            opciones={tecnicos?.map((t) => ({ value: t.idUsuarioApp, label: t.cat_empleados?.nombre ?? t.idUsuarioApp })) ?? []}
            placeholder="Selecciona técnico"
          />

          <CampoFormulario label="Comentario para el técnico" tipo="textarea" value={comentarios} onChange={setComentarios} />

          <div className="space-y-1.5">
            <Label>Adjuntar imágenes</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImagenes(Array.from(e.target.files ?? []))}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Adjuntar videos</Label>
            <Input
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => setVideos(Array.from(e.target.files ?? []))}
            />
          </div>

          <div className="space-y-1.5">
            <Label>Marcar importante</Label>
            <Select value={favoritos || undefined} onValueChange={(value) => setFavoritos(value ?? '')}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona opción">
                  {(value: string) => value}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {OPCIONES_IMPORTANTE.map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Asunto de correo</Label>
            <Input value={asuntoCorreo} onChange={(e) => setAsuntoCorreo(e.target.value)} />
          </div>

          <Button type="submit" className="w-full" disabled={!formValido || isPending}>
            {isPending ? 'Creando…' : 'Crear ticket'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}