import { Injectable } from '@angular/core';
import { MovimientoAhorro, MovimientosMock, IMovimientosService, AWSResponse, MovimientoAWS, AWSAddResponse } from './movimiento';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { switchMap, filter, map, concatAll, tap, flatMap, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';



@Injectable({
  providedIn: 'root'
})
export class MovimientosService implements IMovimientosService {

  url: string;
  movimientos: MovimientoAhorro[];


  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.url = environment.ahorrosAPI;
    console.log('this.url', this.url);
  }

  consultaMovimientos(): Observable<Array<MovimientoAhorro>> {

    if (this.movimientos) {      
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

  guardaMovimientoAWS(movimiento: MovimientoAWS): Observable<AWSAddResponse> {     
     var endpoint = environment.guardarMovimientoAWS;     
     const $token = this.auth.getJWTToken({Issuer:"http://angular-app.com", SecretKey:"151515599211D2345"});

     const result = $token.pipe(
      mergeMap(token => this.http.post<AWSAddResponse>(endpoint,movimiento,this.auth.getSignedHttpOptions()))
    );

     return result;
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

  consultaMovimientoAmazon(cuenta: string, movimiento: number): Observable<AWSResponse> {      
    var endpoint = `${environment.getSingleAWS}PROD/${cuenta}/${movimiento}`;    

    return this.http.get<AWSResponse>(endpoint);
  }

  editaMovimiento(movimiento: MovimientoAhorro): Observable<Object>{

    return this.http.post(this.url + '/api/edit',movimiento);

  }
  
  consultaAmazon(): Observable<AWSResponse> {    
    
    const api = environment.getAllAWS;
    
    const $token = this.auth.getJWTToken({Issuer:"http://angular-app.com", SecretKey:"151515599211D2345"});

    const result = $token.pipe(
      mergeMap(token => this.http.get<AWSResponse>(api, this.auth.getSignedHttpOptions()))
    );
      
    return result;
  }

  setMovimientosCache(movs: MovimientoAhorro[]){
    this.movimientos = movs;
  }

  toDomain(movsAmazon: MovimientoAWS[]): MovimientoAhorro[]{
    return movsAmazon.map(m => {
      return {
        idMovimiento: m.MovimientoID,
        cuenta: m.Cuenta,
        tipo: m.TipoMovimiento,
        monto: m.Monto,
        fecha: m.Fecha,
        comentario: m.Comentario
      };
    });
  }
}
