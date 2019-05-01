import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaMovimientosComponent } from './lista-movimientos/lista-movimientos.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { SummaryComponent } from './summary/summary.component';
import { AltaMovimientoComponent } from './alta-movimiento/alta-movimiento.component';
import { InversionesComponent } from './inversiones/inversiones.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaMovimientosComponent,
    EditComponent,
    LoginComponent,
    SummaryComponent,
    AltaMovimientoComponent,
    InversionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
