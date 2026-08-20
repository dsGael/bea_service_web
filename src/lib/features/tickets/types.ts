// Reflejan el objeto Prisma real que regresa bin_ticket.findMany con TICKET_INCLUDES.
// No hay DTO de respuesta en el backend, así que tipamos el shape crudo.

export interface CatEstadoR {
  idestado: string;
  nombre: string;
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
  idempleado: string;
  nombre: string;
}

export interface UsuarioApp {
  idUsuarioApp: string;
  idEmpleado: string;
  cat_empleados?: CatEmpleado | null;
}

export interface CatAutobus {
  idautobus: string;
  numeroeconomico?: string | null;
}

export interface CatFalla {
  idfalla: string;
  nombre?: string | null;
  descripcion?: string | null;
}

export interface CatRuta {
  idruta: string;
  nombre?: string | null;
}

export interface CatPrioridad {
  idprioridad: string;
  nombre?: string | null;
}

export interface CatDispositivo {
  iddispositivo: string;
  nombre?: string | null;
}

export interface CatDispositivoT {
  iddispositivot: string;
  nombre?: string | null;
}

export interface CatEmpresa {
  idempresa: string;
  nombre?: string | null;
}

// bin_ticket_detail y su cadena de includes — tipado laxo por ahora,
// lo afinamos cuando construyamos la vista de detalle
export interface BinTicketDetail {
  id: string;
  cat_falla?: CatFalla | null;
  cat_diagnostico?: unknown;
  cat_autobus?: CatAutobus | null;
  cat_categoria?: unknown;
  cat_estado_r?: CatEstadoR | null;
  cat_dispositivo?: CatDispositivo | null;
  cat_dispositivo_t?: CatDispositivoT | null;
  cat_prioridad?: CatPrioridad | null;
  solicitud_refaccion?: unknown[];
  [key: string]: unknown; // por si hay campos que aún no mapeamos
}

export interface BinTicket {
  idticket: string;
  folio: string;
  numeroeconomico?: string | null;
  comentarios?: string | null;
  fechacreacion: string;
  tiporeparacion?: string | null;

  idestado: string;
  idautobus?: string | null;
  idtecnico?: string | null;
  idfalla?: string | null;
  idruta?: string | null;

  cat_falla?: CatFalla | null;
  cat_autobus?: CatAutobus | null;
  cat_prioridad?: CatPrioridad | null;
  estado?: EstadoRelacion | null; // ya es el objeto final, sin anidar más
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