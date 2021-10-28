import { Component, OnInit } from '@angular/core';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.styl']
})
export class InicioComponent implements OnInit {

  restoNombre : string = '';
  mesaId!: string | null;

  constructor(private rs: RestoService){
    this.rs.obtenerRestaurant().subscribe(resp => {
      this.restoNombre = resp.nombre
    })
  }
  
  ngOnInit() {

    const intervalo = setInterval(() => {
      if(localStorage.getItem('mesaCheckInLS')){
        this.mesaId = localStorage.getItem('mesaCheckInLS')
        clearInterval(intervalo)
      }
    },100)

  }  



}
