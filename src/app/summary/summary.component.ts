import { Component, OnInit } from '@angular/core';
import { MovimientosMockService } from '../services/movimientos-mock.service';
import { MovimientoAhorro } from '../services/movimiento';
import { MovimientosService } from '../services/movimientos.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
  providers: [{ provide: MovimientosService, useClass: MovimientosService }]
})
export class SummaryComponent implements OnInit {

  constructor(private service: MovimientosService) { }
    ahorros: MovimientoAhorro[];
    gastos: MovimientoAhorro[];
    sumaAhorros: number = 0;
    sumaGastos: number = 0;

  ngOnInit() {


    this.service.consultaMovimientos().subscribe(movs =>{
          
      this.ahorros = movs.filter((value, index,array) => {
        if(value.tipo === 'ahorro')
          return value;
      });

      this.gastos = movs.filter((value, index,array) => {
        if(value.tipo === 'gasto')
          return value;
      });

      this.sumaAhorros = this.ahorros.reduce((accumulator, currentValue, currentIndex, array) => {
          accumulator.monto += currentValue.monto;
          
          return accumulator;
      }).monto;

      this.sumaGastos = this.gastos.reduce((accumulator, currentValue, currentIndex, array) => {
                
        accumulator.monto += currentValue.monto;
          
        return accumulator;
      }).monto;
      

    });

    
  }

}
