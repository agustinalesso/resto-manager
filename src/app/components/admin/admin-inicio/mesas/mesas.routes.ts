import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevaMesaComponent } from './nueva-mesa/nueva-mesa.component';

import { VerMesasComponent } from './ver-mesas/ver-mesas.component';


export const MESAS_ROUTES: Routes = [
    {path: 'ver-mesas', component: VerMesasComponent},
    {path: 'mesa/:id', component: NuevaMesaComponent}
];
