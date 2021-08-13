import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesaModel } from 'src/app/models/mesa.model';
import { RestoData } from 'src/app/models/restaurant.model';
import { MesasService } from 'src/app/services/mesas.service';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-ver-mesas',
  templateUrl: './ver-mesas.component.html',
  styleUrls: ['./ver-mesas.component.styl']
})
export class VerMesasComponent implements OnInit {

  uid_hash: string | null = null;
  datos_restaurante : RestoData = new RestoData();
  datos_mesas! : MesaModel[];
  
  constructor(private restoService : RestoService, private rl : Router, private ms: MesasService) { }

  ngOnInit(): void {
    
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

    this.ms.obtenerMesas().subscribe(resp => {
      this.datos_mesas = resp;                
    })

  }

  crearNuevaMesa(){
    this.rl.navigate(['admin-inicio/mesa','nueva']);
  }

  editarMesa(mesa: MesaModel){
    this.rl.navigate(['admin-inicio/mesa',mesa.id]);
  }

}
