import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MovimientoAhorro, MovimientoAWS } from '../services/movimiento';
import { MovimientosService } from '../services/movimientos.service';
import { MovimientosMockService } from '../services/movimientos-mock.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [{provide: MovimientosService, useClass: MovimientosService}]
})
export class EditComponent implements OnInit {

  movimientoId: number;
  movimiento: MovimientoAhorro;
  mensaje: string = 'Editando...';
  display: boolean = false;
  cuenta: string;

  constructor(private router: Router, private route: ActivatedRoute, private service: MovimientosService) { }

  ngOnInit() {
    
    this.route.params.subscribe((params: Params) => {
      this.movimientoId = params["movimiento_id"];
      this.cuenta = params["cuenta"];
    });

    this.service.consultaMovimientoAmazon(this.cuenta, this.movimientoId).subscribe(r => {
    
      const movimientoAWS: MovimientoAWS = JSON.parse(r.body);
      this.movimiento = { idMovimiento: movimientoAWS.MovimientoID, comentario: movimientoAWS.Comentario, cuenta: movimientoAWS.Cuenta, fecha: movimientoAWS.Fecha, monto: movimientoAWS.Monto, tipo: movimientoAWS.TipoMovimiento };

      
    });

  }

  editar(){

    this.service.editaMovimiento(this.movimiento).subscribe(res =>{
      console.log(res);
      this.display = true;
      this.mensaje = 'Finalizado';
    }, error => {
       console.log('error'); console.log(error);
       this.display = true;
      this.mensaje = 'error.message';
    });

  }

}
