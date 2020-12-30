import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tokenRequestCredentials } from '../models/tokenRequestCredentials-model';
import { tokenResponse } from '../models/tokenResponse-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  showLinks: boolean;
  token: tokenResponse;
  
  constructor(private http: HttpClient) { }

  /**
  * Verifica si hay usuario autenticado
  */
  verificarLogin(): boolean {

    this.showLinks = !!(sessionStorage.getItem('uuid'));

    return this.showLinks;
  }
  
  getJWTToken(credentials: tokenRequestCredentials): Observable<tokenResponse> {

    const httpOptions = { headers: new HttpHeaders(
      {'content-type': 'application/json'}
    )};

    return this.http.post<tokenResponse>(environment.getToken, credentials).pipe(
      tap(resp => {
        this.token = resp;
      })
    );
    
  }

  getSignedHttpOptions(){
    return { headers: new HttpHeaders(
      {
        'content-type': 'application/json',
        'Authorization': this.token.token
      }    
    )};
  }

}
