export interface CatalogoConfig {
  slug: string;
  label: string;
  soloLectura: boolean;
  columnas?: string[]; // si se define, se usan estas y en este orden; si no, fallback a las primeras N del registro
}

export const CATALOGOS: CatalogoConfig[] = [
  // Catálogos con columnas curadas explícitas
  {
    slug: 'autobuses',
    label: 'Autobuses',
    soloLectura: false,
    columnas: ['idAutobus', 'numeroEconomico', 'numeroSerie', 'idEstadoA'],
  },
  {
    slug: 'dispositivos',
    label: 'Dispositivos',
    soloLectura: false,
    columnas: ['idDispositivo', 'idDispositivoT', 'numeroSerie', 'idAutobus'],
  },
  {
    slug: 'fallas',
    label: 'Fallas',
    soloLectura: false,
    columnas: ['idFalla', 'nombre', 'falla'],
  },

  // Catálogos editables (usa fallback automático salvo que agregues columnas)
  { slug: 'horarios', label: 'Horarios', soloLectura: false },
  { slug: 'carrocerias', label: 'Carrocerías', soloLectura: false },
  { slug: 'celulares', label: 'Celulares', soloLectura: false },
  { slug: 'ciudades', label: 'Ciudades', soloLectura: false },
  { slug: 'departamentos', label: 'Departamentos', soloLectura: false },
  { slug: 'diagnosticos', label: 'Diagnósticos', soloLectura: false },
  { slug: 'tipos-dispositivos', label: 'Tipos de dispositivo', soloLectura: false },
  { slug: 'empresas', label: 'Empresas', soloLectura: false },
  { slug: 'reporta', label: 'Reporta', soloLectura: false },
  { slug: 'rutas', label: 'Rutas', soloLectura: false },
  { slug: 'sims-dvr', label: 'SIMs DVR', soloLectura: false },
  { slug: 'sueldos', label: 'Sueldos', soloLectura: false },

  // Catálogos de solo lectura
  { slug: 'categorias', label: 'Categorías', soloLectura: true },
  { slug: 'estados', label: 'Estados', soloLectura: true },
  { slug: 'estados-autobus', label: 'Estados de autobús', soloLectura: true },
  { slug: 'estados-reparacion', label: 'Estados de reparación', soloLectura: true },
  { slug: 'perfiles', label: 'Perfiles', soloLectura: true },
  { slug: 'prioridades', label: 'Prioridades', soloLectura: true },
  { slug: 'tipos-reparacion', label: 'Tipos de reparación', soloLectura: true },
];