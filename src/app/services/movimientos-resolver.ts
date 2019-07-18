import {  Injectable } from '@angular/core';
import { MovimientoAhorro, MovimientoAWS } from './movimiento';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MovimientosService } from './movimientos.service';
import { MovimientosMockService } from './movimientos-mock.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovimientosResolver implements Resolve<MovimientosResolved> {

  constructor(private movimientosService: MovimientosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovimientosResolved> {   

    if(this.movimientosService.movimientos)
    {
      console.warn('hay en cache');
      return of({movimientos: this.movimientosService.movimientos});
    }

       return this.movimientosService.consultaAmazon().pipe(      
        map(movs => {
        const movimientos: MovimientoAWS[] = <MovimientoAWS[]>JSON.parse(movs.body);

        const movimientosDomain: MovimientoAhorro[] = movimientos.map(m => {
          return {
            idMovimiento: m.MovimientoID,
            cuenta: m.Cuenta,
            tipo: m.TipoMovimiento,
            monto: m.Monto,
            fecha: m.Fecha,
            comentario: m.Comentario
          };
        });

        this.movimientosService.setMovimientosCache(movimientosDomain);

        return ({movimientos: movimientosDomain});
       }),
      catchError(error => {
        console.error('ERROR!!', error);
        return of({movimientos: [], error: true, errorMessage: error });
      })
    );
  }
}

export interface MovimientosResolved {
  movimientos: MovimientoAhorro[];  
  error?: boolean;
  errorMessage?: string;
}
