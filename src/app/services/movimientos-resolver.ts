import {  Injectable } from '@angular/core';
import { MovimientoAhorro } from './movimiento';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovimientosService } from './movimientos.service';
import { MovimientosMockService } from './movimientos-mock.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovimientosResolver implements Resolve<MovimientosResolved> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovimientosResolved> {
    return this.movimientosService.consultaMovimientos().pipe(
      map(movs => ({ movimientos: movs })),
      catchError(error => {
        console.error('ERROR!!', error);
        return of({movimientos: [], error: true, errorMessage: error });
      })
    );
  }

  constructor(private movimientosService: MovimientosService) {}

}

export interface MovimientosResolved {
  movimientos: MovimientoAhorro[];
  error?: boolean;
  errorMessage?: string;
}
