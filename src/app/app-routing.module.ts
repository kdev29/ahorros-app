import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaMovimientosComponent } from './lista-movimientos/lista-movimientos.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';
import { AltaMovimientoComponent } from './alta-movimiento/alta-movimiento.component';
import { InversionesComponent } from './inversiones/inversiones.component';
import { MovimientosResolver } from './services/movimientos-resolver';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ListaMovimientosComponent, resolve: { movimientos: MovimientosResolver }},
  { path: 'summary', component: SummaryComponent},
  { path: 'edit/:movimiento_id', component: EditComponent },
  { path: 'addMovimiento', component: AltaMovimientoComponent },
  { path: 'inversiones', component:  InversionesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
