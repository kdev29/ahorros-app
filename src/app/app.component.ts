import { Component, OnInit, ChangeDetectorRef, AfterViewInit, AfterContentChecked } from '@angular/core';
import { ConfigService } from './services/config.service'
import { slideInAnimation } from './app-animations';
import { AuthenticationService } from './services/authentication.service';
import { Router, Event } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit, AfterContentChecked  {
  
  title = 'ahorrosApp';
  showLinks = false; 

  constructor(private service: ConfigService, public auth: AuthenticationService, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() { }

  ngAfterContentChecked(): void {    
    this.cd.detectChanges();
  }

  
}
