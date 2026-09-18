import { useEffect, useState } from 'react';
import { Wrench } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import {
  useDiagnosticosPorFalla,
  useRegistrarReparacion,
} from '../hooks/hooks';

import { CampoFormulario } from '../components/CampoFormulario';

interface Props {
  ticketId: string;
  idFalla: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AgregarReparacionDialog({
  ticketId,
  idFalla,
  open,
  onOpenChange,
}: Readonly<Props>) {
  const [idDiagnostico, setIdDiagnostico] =
    useState('');

  const [reparacion, setReparacion] =
    useState('');

  const [comentarios, setComentarios] =
    useState('');

  const [evidencias, setEvidencias] =
    useState<File[]>([]);

  const {
    data: diagnosticos,
    isLoading: loadingDiagnosticos,
  } = useDiagnosticosPorFalla(
    idFalla || null,
  );

  const {
    mutate,
    isPending,
  } = useRegistrarReparacion();

  const diagnosticoSeleccionado =
    diagnosticos?.find(
      (d) =>
        d.idDiagnostico === idDiagnostico,
    );

  /*
   * Cuando cambia el diagnóstico,
   * automáticamente ponemos la reparación
   * que viene definida en el catálogo.
   */
  useEffect(() => {
    if (!diagnosticoSeleccionado) {
      setReparacion('');
      return;
    }

    setReparacion(
      diagnosticoSeleccionado.reparacion ?? '',
    );
  }, [diagnosticoSeleccionado]);

  /*
   * Cuando se abre el diálogo para otro ticket,
   * limpiamos el formulario.
   */
  useEffect(() => {
    if (!open) {
      setIdDiagnostico('');
      setReparacion('');
      setComentarios('');
      setEvidencias([]);
    }
  }, [open]);

  const handleSubmit = (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!idDiagnostico || !reparacion) {
      return;
    }

    const formData = new FormData();

    formData.append(
      'idDiagnostico',
      idDiagnostico,
    );

    formData.append(
      'Reparacion',
      reparacion,
    );

    if (comentarios) {
      formData.append(
        'comentarios',
        comentarios,
      );
    }

    evidencias.forEach((file) => {
      formData.append(
        'evidenciasReparacion',
        file,
      );
    });

    mutate(
      {
        id: ticketId,
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
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
        <DialogOverlay className="bg-black" /> {/* <--- Fuerzas la opacidad aquí */}
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">

        <DialogHeader>
          <DialogTitle>
            Agregar reparación
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <CampoFormulario
            label="Diagnóstico"
            tipo="combobox"
            requerido
            value={idDiagnostico}
            onChange={setIdDiagnostico}
            opciones={
              diagnosticos?.map((d) => ({
                value: d.idDiagnostico,
                label:
                  d.diagnostico ??
                  d.idDiagnostico,
              })) ?? []
            }
            placeholder={
              loadingDiagnosticos
                ? 'Cargando diagnósticos...'
                : 'Selecciona un diagnóstico'
            }
            disabled={
              loadingDiagnosticos
            }
          />

          <CampoFormulario
            label="Reparación realizada"
            tipo="textarea"
            requerido
            value={reparacion}
            onChange={setReparacion}
            placeholder="Describe la reparación realizada"
          />

          <CampoFormulario
            label="Comentarios"
            tipo="textarea"
            value={comentarios}
            onChange={setComentarios}
            placeholder="Comentarios adicionales"
          />

          <div className="space-y-1.5">
            <Label>
              Evidencia de la reparación
            </Label>

            <Input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={(e) =>
                setEvidencias(
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
              !idDiagnostico ||
              !reparacion ||
              isPending
            }
          >
            {isPending
              ? 'Guardando…'
              : 'Registrar reparación'}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}