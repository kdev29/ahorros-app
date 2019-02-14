import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../services/movimientos.service';
import { MovimientoAhorro } from '../services/movimiento';
import { MovimientosMockService } from '../services/movimientos-mock.service';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-movimientos',
  templateUrl: './lista-movimientos.component.html',
  styleUrls: ['./lista-movimientos.component.css']
  ,  providers: [{provide: MovimientosService, useClass: MovimientosService}]
})
export class ListaMovimientosComponent implements OnInit {

  movimientos: Array<MovimientoAhorro> = [];
  movimiento: MovimientoAhorro;
  name: string = 'abc';
  

  constructor(private movimientosService: MovimientosService) { }
  // constructor(private movimientosService: MovimientosService, private router: Route, private route: ActivatedRoute) { }

  ngOnInit() {

    
    
    this.movimientosService.consultaMovimientos().subscribe(movs =>{
      this.movimientos = movs;
    },(error) => {
      alert('Error: ' + error.message)
    });
    
    console.log('en init de movimientos');
    this.movimiento = new MovimientoAhorro();
  }

  onTipoMovimientoChanged(){
    console.log('changed!');
    console.log(this.movimiento.tipo);
  }

  guardar(){
    console.log('guarda');
    this.movimientosService.guardaMovimiento(this.movimiento).subscribe(result =>{
      console.log(result);
      this.movimiento.fecha = new Date().toDateString();
      this.movimiento.idMovimiento = this.movimientos.length + 1;
      this.movimientos.push(this.movimiento);
    },(error) => {
      alert('Error: ' + error)
    });
  }

  onChange(text){
    console.log(text);
  }


}
