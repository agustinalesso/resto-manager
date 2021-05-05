import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../app/guards/auth.guard'
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/publico/inicio/inicio.component';
import { AdminInicioComponent } from './components/admin/admin-inicio/admin-inicio.component'

const routes: Routes = [
  { path: 'admin-start', component: AdminInicioComponent, canActivate: [AuthGuard] },
  { path: 'admin-login'   , component: LoginComponent },
  { path: 'inicio/:idResto/:idMesa'   , component: InicioComponent },
  { path: '**', redirectTo: 'inicio/:idResto/:idMesa' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
