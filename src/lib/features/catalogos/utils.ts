import type { CampoFormulario } from './types';
import type { CatalogoConfig } from './constants';

// Si hay formSchema explícito, se usa tal cual.
// Si no, fallback: usa las `columnas` definidas como texto libre (excluyendo el id, no editable).
export function resolverCamposFormulario(
  config: CatalogoConfig,
  modo: 'crear' | 'editar'
): CampoFormulario[] {
  if (config.formSchema) {
    return config.formSchema.filter((c) =>
      modo === 'crear' ? !c.soloEnEditar : !c.soloEnCrear
    );
  }

  // fallback genérico sin schema curado
  const columnas = config.columnas ?? [];
  return columnas
    .filter((c) => !c.toLowerCase().startsWith('id')) // no editar el id manualmente
    .map((c) => ({ name: c, label: c, tipo: 'text' as const }));
}