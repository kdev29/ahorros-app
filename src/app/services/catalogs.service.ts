import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cuenta } from '../models/cuenta-model';

@Injectable({
  providedIn: 'root'
})
export class CatalogsService {

  constructor(private http: HttpClient) { }

  consultaTiposCuenta(): Observable<cuenta> {
    debugger;
    return this.http.get<cuenta>("https://ahorros-app.s3.amazonaws.com/catalogs/cuentas.json");
  }

}
