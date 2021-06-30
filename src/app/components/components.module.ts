import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminInicioComponent } from './admin/admin-inicio/admin-inicio.component';
import { InicioComponent } from './admin/admin-inicio/inicio/inicio.component';
import { VerMenuComponent } from './admin/admin-inicio/menu/ver-menu/ver-menu.component';
import { VerMesasComponent } from './admin/admin-inicio/mesas/ver-mesas/ver-mesas.component';
import { NuevaMesaComponent } from './admin/admin-inicio/mesas/nueva-mesa/nueva-mesa.component';
import { VerMovimientosComponent } from './admin/admin-inicio/movimientos/ver-movimientos/ver-movimientos.component';
import { VerPedidosComponent } from './admin/admin-inicio/pedidos/ver-pedidos/ver-pedidos.component';
import { ConfiguracionComponent } from './admin/admin-inicio/configuracion/configuracion.component';
import { CerrarSesionComponent } from './admin/admin-inicio/cerrar-sesion/cerrar-sesion.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    AdminInicioComponent,
    InicioComponent,
    VerMenuComponent,
    VerMesasComponent,
    NuevaMesaComponent,
    VerMovimientosComponent,
    VerPedidosComponent,
    ConfiguracionComponent,
    CerrarSesionComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class ComponentsModule { }