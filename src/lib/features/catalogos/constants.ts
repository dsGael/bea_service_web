import type { CampoFormulario } from './types';

export interface CatalogoConfig {
  slug: string;
  label: string;
  soloLectura: boolean;
  columnas?: string[]; // Si se define, se usan estas y en este orden; si no, fallback a las primeras N del registro
  formSchema?: CampoFormulario[]; // Esquema para el formulario de alta/edición; si no se define, se usa fallback dinámico
}

export const CATALOGOS: CatalogoConfig[] = [
  // --- Catálogos editables con configuración curada (columnas y/o formSchema) ---
  {
    slug: 'fallas',
    label: 'Fallas',
    soloLectura: false,
    columnas: ['idFalla', 'nombre', 'falla'],
    formSchema: [
      { name: 'idDispositivo', label: 'Tipo de dispositivo (ID)', tipo: 'text', requerido: true },
      { name: 'nombre', label: 'Nombre', tipo: 'text', requerido: true },
      { name: 'falla', label: 'Falla', tipo: 'text', requerido: true },
      { name: 'descripcionFalla', label: 'Descripción', tipo: 'textarea' },
    ],
  },
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
    slug: 'rutas',
    label: 'Rutas',
    soloLectura: false,
    formSchema: [
      { name: 'nombre', label: 'Nombre de ruta', tipo: 'text', requerido: true },
    ],
  },
  {
    slug: 'ciudades',
    label: 'Ciudades',
    soloLectura: false,
    formSchema: [
      { name: 'nombre', label: 'Nombre', tipo: 'text', requerido: true },
    ],
  },

  // --- Catálogos editables pendientes de curar (usan fallback automático) ---
  { slug: 'horarios', label: 'Horarios', soloLectura: false },
  { slug: 'carrocerias', label: 'Carrocerías', soloLectura: false },
  { slug: 'celulares', label: 'Celulares', soloLectura: false },
  { slug: 'departamentos', label: 'Departamentos', soloLectura: false },
  { slug: 'diagnosticos', label: 'Diagnósticos', soloLectura: false },
  { slug: 'tipos-dispositivos', label: 'Tipos de dispositivo', soloLectura: false },
  { slug: 'empresas', label: 'Empresas', soloLectura: false },
  { slug: 'reporta', label: 'Reporta', soloLectura: false },
  { slug: 'sims-dvr', label: 'SIMs DVR', soloLectura: false },
  { slug: 'sueldos', label: 'Sueldos', soloLectura: false },

  // --- Catálogos de solo lectura ---
  { slug: 'categorias', label: 'Categorías', soloLectura: true },
  { slug: 'estados', label: 'Estados', soloLectura: true },
  { slug: 'estados-autobus', label: 'Estados de autobús', soloLectura: true },
  { slug: 'estados-reparacion', label: 'Estados de reparación', soloLectura: true },
  { slug: 'perfiles', label: 'Perfiles', soloLectura: true },
  { slug: 'prioridades', label: 'Prioridades', soloLectura: true },
  { slug: 'tipos-reparacion', label: 'Tipos de reparación', soloLectura: true },
];