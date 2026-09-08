export type CampoTipo = 'text' | 'number' | 'boolean' | 'date' | 'textarea';

export interface CampoFormulario {
  name: string;
  label: string;
  tipo: CampoTipo;
  requerido?: boolean;
  soloEnEditar?: boolean; // ej. un campo que no aplica al crear
  soloEnCrear?: boolean; // ej. un campo que ya no se debe tocar al editar
}