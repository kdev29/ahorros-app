import { Component, OnInit } from '@angular/core';
import { MovimientoAhorro } from '../services/movimiento';
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
      this.movimientosService.guardaMovimiento(this.movimiento).subscribe(result => {
        console.log(result);
        this.error = false;
        this.mostrarMensaje = true;
        this.mensaje = 'Finalizado';
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



