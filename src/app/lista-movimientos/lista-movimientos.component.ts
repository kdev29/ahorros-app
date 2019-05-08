import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../services/movimientos.service';
import { MovimientoAhorro } from '../services/movimiento';
import { MovimientosMockService } from '../services/movimientos-mock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MovimientosResolved } from '../services/movimientos-resolver';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrls: ['./lista-movimientos.component.css']
  ,providers: [{provide: MovimientosService, useClass: MovimientosService }]
})
export class ListaMovimientosComponent implements OnInit {

  movimientos: Array<MovimientoAhorro> = [];
  error: boolean;
  errorMessage: any;

  constructor(private movimientosService: MovimientosService,
              private router: Router,
              private route: ActivatedRoute,
              private auth: AuthenticationService) { }

  ngOnInit() {

    this.verificarLogin();

    // this.movimientosService.consultaMovimientos().subscribe(movs => {
    //   this.movimientos = movs;
    // }, (error) => {
    //   alert('Error: ' + error.message)
    // });

    const movimientosResolved = <MovimientosResolved>this.route.snapshot.data['movimientos'];
    this.movimientos = movimientosResolved.movimientos;
    this.error = movimientosResolved.error;
    this.errorMessage = movimientosResolved.errorMessage;

  }

  verificarLogin() {
    const isAuthenticated = this.auth.verificarLogin();

    if (!isAuthenticated) {
      this.router.navigate(['login']);
    }
  }

}
