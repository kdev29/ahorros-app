import { Injectable } from '@angular/core';
import { MovimientoAhorro, MovimientosMock, IMovimientosService } from './movimiento';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { switchMap, filter, map, concatAll } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class MovimientosService implements IMovimientosService {

  //url: string = "https://gastos.gearhostpreview.com";
  url: string = "https://hobbygastos.tk";
  
  //url: string = "http://192.168.100.15:8012";//"http://localhost:8012";

  constructor(private http: HttpClient) { }

  consultaMovimientos(): Observable<Array<MovimientoAhorro>>{    
    return this.http.get<Array<MovimientoAhorro>>(this.url + "/api/movimientos");  
  }

  guardaMovimiento(movimiento: MovimientoAhorro){
    return this.http.post(this.url + '/api/movimientos/save', movimiento);
  }

  consultaMovimiento(id: number): Observable<MovimientoAhorro[]>{

    let mov: MovimientoAhorro;

    let movs = this.consultaMovimientos();
     
    return movs.pipe(map(mvmnts => {
        const filtered: MovimientoAhorro[] = [];

        // mvmnts.forEach(m =>{
        //     if(m.idMovimiento == id)
        //       filtered.push(m);
        // });
        
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
