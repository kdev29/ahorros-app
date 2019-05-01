import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ahorrosApp';

  constructor(private service: ConfigService){}

  ngOnInit(){
    this.service.loadConfig().subscribe(data => {
      console.log('cargando configuracion...');
      console.log(data);
    });
  }
}
