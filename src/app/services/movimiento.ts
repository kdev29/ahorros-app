import { Observable } from 'rxjs';

export class MovimientoAhorro {
    idMovimiento: number;
    cuenta: string;
    tipo: string;
    monto: number;
    fecha: string;
    comentario: string;
}

export const MovimientosMock: Array<MovimientoAhorro> = [
  { comentario: "test", cuenta: "Banamex", idMovimiento: 1, fecha: '20180101', monto: 250.50, tipo: "ahorro" },
  { comentario: "test 2", cuenta: "Banamex", idMovimiento: 2, fecha: '20180101', monto: 250.50, tipo: "ahorro" },
  { comentario: "test 3", cuenta: "Banamex", idMovimiento: 3, fecha: '20180101', monto: 250.50, tipo: "ahorro" },
  { comentario: "test 4", cuenta: "Banamex", idMovimiento: 4, fecha: '20180101', monto: 250.50, tipo: "ahorro" }
];

export interface IMovimientosService{
  consultaMovimientos(): Observable<Array<MovimientoAhorro>>;
  guardaMovimiento(movimiento: MovimientoAhorro);
  consultaMovimiento(id: number): Observable<MovimientoAhorro[]>;
  editaMovimiento(movimiento: MovimientoAhorro): Observable<Object>;
}