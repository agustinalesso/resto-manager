import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireModule } from '@angular/fire';

import { AdminInicioComponent } from './admin/admin-inicio/admin-inicio.component';
import { InicioComponent } from './admin/admin-inicio/inicio/inicio.component';
import { VerMenuComponent } from './admin/admin-inicio/menu/ver-menu/ver-menu.component';
import { ItemMenuComponent } from './admin/admin-inicio/menu/item-menu/item-menu.component';
import { VerMesasComponent } from './admin/admin-inicio/mesas/ver-mesas/ver-mesas.component';
import { NuevaMesaComponent } from './admin/admin-inicio/mesas/nueva-mesa/nueva-mesa.component';
import { VerMovimientosComponent } from './admin/admin-inicio/movimientos/ver-movimientos/ver-movimientos.component';
import { VerPedidosComponent } from './admin/admin-inicio/pedidos/ver-pedidos/ver-pedidos.component';
import { ConfiguracionComponent } from './admin/admin-inicio/configuracion/configuracion.component';
import { CerrarSesionComponent } from './admin/admin-inicio/cerrar-sesion/cerrar-sesion.component';
import { VerCategoriasComponent } from './admin/admin-inicio/categorias/ver-categorias/ver-categorias.component';
import { NuevaCategoriasComponent } from './admin/admin-inicio/categorias/nueva-categorias/nueva-categorias.component';
import { UploaderComponent } from './shared/uploader/uploader.component';
import { DragdropDirective } from '../directives/dragdrop.directive';
import { BienvenidaComponent } from './publico/inicio/bienvenida/bienvenida.component';
import { SeleccionCategoriasComponent } from './publico/inicio/seleccion-categorias/seleccion-categorias.component';

@NgModule({
  declarations: [
    AdminInicioComponent,
    InicioComponent,
    VerMenuComponent,
    ItemMenuComponent,
    VerMesasComponent,
    NuevaMesaComponent,
    VerMovimientosComponent,
    VerPedidosComponent,
    ConfiguracionComponent,
    CerrarSesionComponent,
    VerCategoriasComponent,
    NuevaCategoriasComponent,
    UploaderComponent,
    DragdropDirective,
    BienvenidaComponent,
    SeleccionCategoriasComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ]
})
export class ComponentsModule { }
