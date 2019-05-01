import { Injectable } from '@angular/core';
import { MovimientoAhorro, MovimientosMock, IMovimientosService } from './movimiento';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosMockService implements IMovimientosService {

  constructor(private http: HttpClient) {
    console.warn('usando mock service');
   }

  consultaMovimientos(): Observable<Array<MovimientoAhorro>>{
    return of(MovimientosMock);
  }

  guardaMovimiento(movimiento: MovimientoAhorro){
    return of({});
  }

  consultaMovimiento(id: number): Observable<MovimientoAhorro[]>{

    let movimientos = [];

    movimientos.push(MovimientosMock.find((m)=>{

      return m.idMovimiento == id;
    }));

    return of(movimientos);
  }

  editaMovimiento(movimiento: MovimientoAhorro){
    console.log('mock: editaMovimiento');
    console.log(movimiento);

    return of({})
  }
}
