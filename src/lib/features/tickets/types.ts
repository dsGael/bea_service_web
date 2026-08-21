// ── Sub-catálogos (camelCase, tal cual vienen anidados) ──

export interface CatFalla {
  idFalla: string;
  idDispositivo?: string | null;
  nombre?: string | null;
  falla?: string | null;
  descripcionFalla?: string | null;
}

export interface CatAutobus {
  idAutobus: string;
  numeroEconomico?: string | null;
  idRuta?: string | null;
  numeroSerie?: string | null;
}

export interface CatPrioridad {
  idPrioridad: string;
  nombre?: string | null; 
}

export interface EstadoRelacion {
  idEstadoR: string;
  nombre: string;
  creadoPor?: string | null;
  fechaCreacion?: string | null;
  modificadoPor?: string | null;
  fechaModificacion?: string | null;
}

export interface CatEmpleado {
  idEmpleado: string;
  numEmpleado?: number | null;
  nombre: string;
  celular?: string | null;
  puesto?: string | null;
  foto?: string | null;
}

export interface UsuarioApp {
  idUsuarioApp: string;
  especialidad?: string | null;
  idEmpleado: string;
  perfil?: string | null;
  activo?: boolean;
  useremail?: string | null;
  cat_empleados?: CatEmpleado | null;
}

export interface CatDispositivoT {
  idDispositivoT: string;
  nombre?: string | null;
  descripcion?: string | null;
  tipo?: string | null;
  requiereSerie?: boolean;
}

export interface CatDispositivo {
  idDispositivo: string;
  idDispositivoT?: string | null;
  numeroSerie?: string | null;
  idAutobus?: string | null;
  comentarios?: string | null;
}

export interface CatDiagnostico {
  idDiagnostico: string;
  idDispositivoT?: string | null;
  idFalla?: string | null;
  nombreDispositivo?: string | null;
  fallaNombre?: string | null;
  diagnostico?: string | null;
  reparacion?: string | null;
  tiempoReparacionHoras?: number | null;
  creadoPor?: string | null;
  fechaCreacion?: string | null;
  modificadoPor?: string | null;
  fechaModificacion?: string | null;
}

export interface CatRuta {
  idRuta: string;
  nombre?: string | null;
}

export interface CatEmpresa {
  idEmpresa: string;
  nombre?: string | null;
  acronimo?: string | null;
}

export interface CatCategoria {
  idCategoria: string;
  nombre?: string | null;
  descripcion?: string | null;
}

export interface SolicitudRefaccion {
  [key: string]: unknown; // lo tipamos fino cuando toquemos Almacén
}

// ── bin_ticket_detail: cada intervención/reparación ──

export interface BinTicketDetail {
  idDetalle: string;
  idTicket: string;
  fechaHora: string;
  folio: string;
  idAutobus?: string | null;
  numeroeconomico?: string | null;
  idRuta?: string | null;
  idDispositivo?: string | null;
  idDispositivoT?: string | null;
  idFalla?: string | null;
  idCategoria?: string | null;
  idPrioridad?: string | null;
  idEstado?: string | null;
  idTecnico?: string | null;

  Diagnostico?: string | null; // FK -> cat_diagnostico.idDiagnostico
  Reparacion?: string | null;  // FK -> cat_reparacion.idReparacion (a confirmar)
  comentarios?: string | null;
  areatrabajo?: string | null;

  imagen1: string[];
  video: string[];

  fechaResolucion?: string | null;
  creadoPor?: string | null;
  fechaCreacion: string;

  cat_falla?: CatFalla | null;
  cat_diagnostico?: CatDiagnostico | null;
  cat_reparacion?: CatReparacion | null; // pendiente de confirmar shape
  cat_autobus?: CatAutobus | null;
  cat_categoria?: CatCategoria | null;
  cat_estado_r?: EstadoRelacion | null;
  cat_dispositivo?: CatDispositivo | null;
  cat_dispositivo_t?: CatDispositivoT | null;
  cat_prioridad?: CatPrioridad | null;
  solicitud_refaccion?: SolicitudRefaccion[];
}

export interface CatReparacion {
  idReparacion: string;
  reparacion?: string | null;
  // agrega aquí los demás campos cuando confirmes el shape real del include
}

// ── bin_ticket raíz ──

export interface BinTicket {
  idticket: string;
  fecha?: string | null;
  tiporeparacion?: string | null;
  folio: string;
  idautobus?: string | null;
  numeroeconomico?: string | null;
  idruta?: string | null;
  idoperador?: string | null;
  nombreoperador?: string | null;
  iddispositivo?: string | null;
  iddispositivot?: string | null;
  idfalla?: string | null;
  idcategoria?: string | null;
  idprioridad?: string | null;
  idestado: string;
  idtecnico?: string | null;
  comentarios?: string | null;
  areatrabajo?: string | null;
  descripcion?: string | null;
  fecharesolucion?: string | null;
  fechacreacion: string;
  fechamodificacion?: string | null;
  fechareportecliente?: string | null;
  num_folio?: number | null;

  imagenfalla1: string[];
  video: string[];

  cat_falla?: CatFalla | null;
  cat_autobus?: CatAutobus | null;
  cat_prioridad?: CatPrioridad | null;
  estado?: EstadoRelacion | null;
  cat_tecnicos?: UsuarioApp | null;
  cat_dispositivo_t?: CatDispositivoT | null;
  cat_dispositivo?: CatDispositivo | null;
  cat_ruta?: CatRuta | null;
  cat_empresa?: CatEmpresa | null;
  bin_ticket_detail?: BinTicketDetail[];
}
export interface ListarTicketsParams {
  buscar?: string;
  idestado?: string;
  idautobus?: string;
  idruta?: string;
  idtecnico?: string;
  idprioridad?: string;
  idcategoria?: string;
  iddispositivoT?: string;
  iddispositivo?: string;
  idfalla?: string;
  isMantenimiento?: 'true' | 'false';
  isAbierto?: 'true' | 'false';
  isActivo?: 'true' | 'false';
  page?: number;
  limit?: number;
}

export interface ListarTicketsResponse {
  data: BinTicket[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CatRuta {
  idruta: string;
  nombre?: string | null;
}