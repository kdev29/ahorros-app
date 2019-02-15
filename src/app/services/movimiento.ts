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
  { comentario: "test 2", cuenta: "Banamex", idMovimiento: 2, fecha: '20180101', monto: 600.00, tipo: "ahorro" },
  { comentario: "test 3", cuenta: "Banamex", idMovimiento: 3, fecha: '20180101', monto: 2500.0, tipo: "gasto" },
  { comentario: "test 4", cuenta: "Banamex", idMovimiento: 4, fecha: '20180101', monto: 150.00, tipo: "ahorro" },
  { comentario: "test 5", cuenta: "Banamex", idMovimiento: 5, fecha: '20180101', monto: 770.00, tipo: "ahorro" },
  { comentario: "test 6", cuenta: "Banamex", idMovimiento: 6, fecha: '20180101', monto: 850.00, tipo: "ahorro" },
  { comentario: "test 7", cuenta: "Banamex", idMovimiento: 7, fecha: '20180101', monto: 1000.80, tipo: "gasto" },
  { comentario: "test 8", cuenta: "Banamex", idMovimiento: 8, fecha: '20180101', monto: 350.00, tipo: "gasto" }
];

export interface IMovimientosService{
  consultaMovimientos(): Observable<Array<MovimientoAhorro>>;
  guardaMovimiento(movimiento: MovimientoAhorro);
  consultaMovimiento(id: number): Observable<MovimientoAhorro[]>;
  editaMovimiento(movimiento: MovimientoAhorro): Observable<Object>;
}