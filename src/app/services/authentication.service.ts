import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  /**
  * Verifica si hay usuario autenticado
  */
  verificarLogin(): boolean {
    return  sessionStorage.getItem('uuid') !== undefined;
  }

}
