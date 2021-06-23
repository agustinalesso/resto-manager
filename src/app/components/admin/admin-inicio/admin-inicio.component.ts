import { Component, OnInit } from '@angular/core';
import { RestoData } from 'src/app/models/restaurant.model';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-admin-inicio',
  templateUrl: './admin-inicio.component.html',
  styleUrls: ['./admin-inicio.component.styl']
})
export class AdminInicioComponent implements OnInit {

  uid_hash: string | null = null;
  datos_restaurante! : RestoData;

  constructor(private restoService : RestoService) { }

  ngOnInit(): void {
    
    this.uid_hash = localStorage.getItem('uid_hash');

    if(this.uid_hash){
      this.restoService.obtenerRestaurant().subscribe(resp => {
        this.datos_restaurante = resp;
      })
    }

  }

}
