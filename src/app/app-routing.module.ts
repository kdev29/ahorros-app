import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaMovimientosComponent } from './lista-movimientos/lista-movimientos.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ListaMovimientosComponent},
  { path: 'summary', component: SummaryComponent},
  { path: 'edit/:movimiento_id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]  
})
export class AppRoutingModule { }
