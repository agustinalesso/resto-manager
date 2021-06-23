import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AdminInicioComponent } from './components/admin/admin-inicio/admin-inicio.component';
import { InicioComponent } from './components/publico/inicio/inicio.component';
import { ScannerComponent } from './components/publico/scanner/scanner.component';
import { VerMesasComponent } from './components/admin/admin-inicio/mesas/ver-mesas/ver-mesas.component';
import { NuevaMesaComponent } from './components/admin/admin-inicio/mesas/nueva-mesa/nueva-mesa.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminInicioComponent,
    InicioComponent,
    ScannerComponent,
    VerMesasComponent,
    NuevaMesaComponent
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
