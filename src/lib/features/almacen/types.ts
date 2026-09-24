export type TipoMovimiento = 'entrada' | 'salida';

export interface AlmacenResumen {
  idAlmacen: string;
  nombre: string;
  ubicacion: string;
  responsable: string;
}

export interface DispositivoResumen {
  idDispositivoT: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  requiereSerie: boolean;
}

export interface Movimiento {
  idMovimiento: string;
  codigo: string;
  fecha: string;
  tipoMovimiento: TipoMovimiento;
  idDispositivo: string | null;
  cantidad: number;
  idAlmacenOrigen: string | null;
  idAlmacenDestino: string | null;
  numeroSerie: string | null;
  imei1: string | null;
  imei2: string | null;
  comentario: string | null;
  creadoPor: string | null;
  fechaCreacion: string;
  almacenOrigen: Almacen | null;
  almacenDestino: Almacen | null;
  dispositivo: DispositivoResumen | null;
}

export interface RegistrarMovimientoPayload {
  tipoMovimiento: TipoMovimiento;
  idDispositivo: string;
  cantidad: number;
  idAlmacenOrigen: string;
  idAlmacenDestino: string;
  numeroSerie?: string;
  imei1?: string;
  imei2?: string;
  comentario?: string;
}

export interface Almacen {
  idAlmacen: string;
  nombre: string;
  ubicacion: string;
  responsable: string;
  creadoPor: string;
  fechaCreacion: string;
  modificadoPor: string;
  fechaModificacion: string | null;
}

export interface CrearAlmacenPayload {
  nombre: string;
  ubicacion?: string;
  responsable?: string;
}

export type ActualizarAlmacenPayload = Partial<CrearAlmacenPayload>;

export interface DispositivoInstancia {
  idDispositivo: string;
  numeroSerie: string | null;
  imei1: string | null;
  imei2: string | null;
  idAutobus: string | null;
  fechaInstalacion: string | null;
  comentarios: string | null;
  cat_dispositivo_t: DispositivoResumen | null;
}

export interface MovimientoResumen {
  idMovimiento: string;
  codigo: string;
  fecha: string;
  tipoMovimiento: TipoMovimiento;
  idDispositivo: string | null;
  cantidad: number;
  idAlmacenOrigen: string | null;
  idAlmacenDestino: string | null;
  numeroSerie: string | null;
  imei1: string | null;
  imei2: string | null;
  comentario: string | null;
  creadoPor: string | null;
  fechaCreacion: string;
  dispositivo: DispositivoResumen | null;
}

export interface AlmacenDetalle extends Almacen {
  dispositivos: DispositivoInstancia[];
  movimientos: MovimientoResumen[];
}