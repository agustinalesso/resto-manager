import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RestoData } from 'src/app/models/restaurant.model';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.styl']
})
export class InicioComponent implements OnInit {

  uid_hash: string | null = null;
  datos_restaurante? : Observable<RestoData>;

  constructor(private restoService : RestoService) { }

  ngOnInit(): void {
    
    this.datos_restaurante = this.restoService.obtenerRestaurant();

  }

}
