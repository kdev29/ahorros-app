import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaMovimientosComponent } from './lista-movimientos/lista-movimientos.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: '', component: ListaMovimientosComponent},
  { path: 'edit/:movimiento_id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]  
})
export class AppRoutingModule { }
