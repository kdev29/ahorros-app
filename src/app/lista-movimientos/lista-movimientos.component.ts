import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../services/movimientos.service';
import { MovimientoAhorro } from '../services/movimiento';
import { MovimientosMockService } from '../services/movimientos-mock.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrls: ['./lista-movimientos.component.css']
  ,providers: [{provide: MovimientosService, useClass: MovimientosService }]
})
export class ListaMovimientosComponent implements OnInit {

  movimientos: Array<MovimientoAhorro> = [];

  constructor(private movimientosService: MovimientosService, private router: Router) { }

  ngOnInit() {

    this.verificarLogin();

    this.movimientosService.consultaMovimientos().subscribe(movs => {
      this.movimientos = movs;
    }, (error) => {
      alert('Error: ' + error.message)
    });

  }

  verificarLogin(){
    if (sessionStorage.getItem('uuid') == undefined) {
      this.router.navigate(['login']);
    }
  }

}
