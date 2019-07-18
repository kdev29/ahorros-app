import { Injectable, ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  showLinks: boolean;
  
  constructor() { }

  /**
  * Verifica si hay usuario autenticado
  */
  verificarLogin(): boolean {

    this.showLinks = !!(sessionStorage.getItem('uuid'));

    return this.showLinks;
  }  

}
