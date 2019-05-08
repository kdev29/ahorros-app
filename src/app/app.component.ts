import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config.service'
import { slideInAnimation } from './app-animations';
import { AuthenticationService } from './services/authentication.service';
import { Router, Event } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  title = 'ahorrosApp';
  showLinks = false;

  constructor(private service: ConfigService, private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {

    const isAuthenticated = this.auth.verificarLogin();

    if (isAuthenticated) {
      this.showLinks = true;
    }

    this.router.events.subscribe((event: Event) => {
      console.log(event)
    });

    // this.service.loadConfig().subscribe(data => {
    //   console.log('cargando configuracion...');
    //   console.log(data);
    // });
  }
}
