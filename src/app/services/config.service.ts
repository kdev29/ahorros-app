import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private appConfig;

  constructor(private http: HttpClient) { }


  loadConfig() {
    return this.http.get('/appSettings.json');
  }

  getConfig() {
    return this.appConfig;
  }

}
