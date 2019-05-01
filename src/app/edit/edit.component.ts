import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { MovimientoAhorro } from '../services/movimiento';
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

  constructor(private router: Router, private route: ActivatedRoute, private service: MovimientosService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.movimientoId = params["movimiento_id"];
    });

    this.service.consultaMovimiento(this.movimientoId).subscribe(movs => {
      console.log(movs);
      this.movimiento = movs[0];
      console.log('this.movimiento'+this.movimiento.comentario);
    });

  }

  editar(){
    console.log('editando...');
    console.log(this.movimiento);

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
