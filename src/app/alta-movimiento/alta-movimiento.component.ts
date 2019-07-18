import { Component, OnInit } from '@angular/core';
import { MovimientoAhorro, MovimientoAWS } from '../services/movimiento';
import { NgForm } from '@angular/forms';
import { MovimientosService } from '../services/movimientos.service';

@Component({
  selector: 'app-alta-movimiento',
  templateUrl: './alta-movimiento.component.html',
  styleUrls: ['./alta-movimiento.component.css']
})
export class AltaMovimientoComponent implements OnInit {

  movimiento = new MovimientoAhorro();
  mostrarMensaje = false;
  mensaje: string;
  error: boolean = false;

  constructor(private movimientosService: MovimientosService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    if (form.valid) {

      const movimientoAWS: MovimientoAWS = {
        Comentario: this.movimiento.comentario,
        Cuenta: this.movimiento.cuenta,
        Fecha: this.movimiento.fecha,
        Monto: this.movimiento.monto,
        MovimientoID: 0,
        TipoMovimiento: this.movimiento.tipo
      };

      this.movimientosService.guardaMovimientoAWS(movimientoAWS).subscribe(result => {
        console.log(result);
        this.error = false;
        this.mostrarMensaje = true;
        this.mensaje = 'Finalizado';
        
        this.movimientosService.setMovimientosCache(null);
      }, error => {
        this.error = true;
        this.mostrarMensaje = true;
        this.mensaje = 'Ha ocurrido un error ' + error.message;
      });
    } else {
        this.error = true;
        this.mostrarMensaje = true;
        this.mensaje = 'Hay un error con la validación de la forma';
    }

  }

}



