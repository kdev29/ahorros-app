import { Injectable } from '@angular/core';
import { MovimientoAhorro, MovimientosMock, IMovimientosService } from './movimiento';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { switchMap, filter, map, concatAll, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MovimientosService implements IMovimientosService {

  url: string;
  movimientos: MovimientoAhorro[];


  constructor(private http: HttpClient) {
    this.url = environment.ahorrosAPI;
    console.log('this.url', this.url);
  }

  consultaMovimientos(): Observable<Array<MovimientoAhorro>> {

    if (this.movimientos) {
      console.log('returning from cache');
      return of(this.movimientos);
    }
    else {

      return this.http.get<Array<MovimientoAhorro>>(this.url + '/api/movimientos').pipe(
        tap( movs => { this.movimientos = movs; })
      );
    }
  }

  guardaMovimiento(movimiento: MovimientoAhorro) {
    return this.http.post(this.url + '/api/movimientos/save', movimiento);
  }

  consultaMovimiento(id: number): Observable<MovimientoAhorro[]>{

    let mov: MovimientoAhorro;

    let movs = this.consultaMovimientos();

    return movs.pipe(map(mvmnts => {
        const filtered: MovimientoAhorro[] = [];

        filtered.push(mvmnts.find(m => {
          return m.idMovimiento == id;
        }));

        return filtered;
    }));


  }

  editaMovimiento(movimiento: MovimientoAhorro): Observable<Object>{
    console.log('service: editaMovimiento');
    console.log(movimiento);

    return this.http.post(this.url + '/api/edit',movimiento);

  }
}
