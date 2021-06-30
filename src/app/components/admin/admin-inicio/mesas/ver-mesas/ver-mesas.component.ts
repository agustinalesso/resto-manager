import { Component, OnInit } from '@angular/core';
import { RestoData } from 'src/app/models/restaurant.model';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-ver-mesas',
  templateUrl: './ver-mesas.component.html',
  styleUrls: ['./ver-mesas.component.styl']
})
export class VerMesasComponent implements OnInit {

  uid_hash: string | null = null;
  datos_restaurante : RestoData = new RestoData();

  constructor(private restoService : RestoService) { }

  ngOnInit(): void {
    
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

  }

}
