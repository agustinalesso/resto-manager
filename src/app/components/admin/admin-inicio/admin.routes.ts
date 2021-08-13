import { Routes } from '@angular/router';

import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';

import { InicioComponent } from './inicio/inicio.component';
import { ItemMenuComponent } from './menu/item-menu/item-menu.component';
import { VerMenuComponent } from './menu/ver-menu/ver-menu.component';
import { NuevaMesaComponent } from './mesas/nueva-mesa/nueva-mesa.component';
import { VerMesasComponent } from './mesas/ver-mesas/ver-mesas.component';
import { VerMovimientosComponent } from './movimientos/ver-movimientos/ver-movimientos.component';
import { VerPedidosComponent } from './pedidos/ver-pedidos/ver-pedidos.component';


export const ADMIN_ROUTES: Routes = [
    {path: 'ver-mesas', component: VerMesasComponent},
    {path: 'mesa/:id', component: NuevaMesaComponent},
    {path: 'ver-menu', component: VerMenuComponent},
    {path: 'menu/:id', component: ItemMenuComponent},
    {path: 'ver-pedidos', component: VerPedidosComponent},
    {path: 'ver-movimientos', component: VerMovimientosComponent},
    {path: 'configuracion', component: ConfiguracionComponent},
    {path: 'cerrar-sesion', component: CerrarSesionComponent},
    {path: 'dashboard', component: InicioComponent},
    {path: '**', pathMatch:'full', redirectTo: 'dashboard'}
];
