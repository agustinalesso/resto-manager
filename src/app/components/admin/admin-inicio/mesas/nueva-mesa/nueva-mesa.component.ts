import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RestoData } from 'src/app/models/restaurant.model';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-nueva-mesa',
  templateUrl: './nueva-mesa.component.html',
  styleUrls: ['./nueva-mesa.component.styl']
})
export class NuevaMesaComponent implements OnInit {

  datos_restaurante : RestoData = new RestoData();
  mensaje : string = '';
  mesaId : string | null = ''

  constructor(private restoService : RestoService, private rl : ActivatedRoute) {}
  
  ngOnInit(): void {
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

    this.mesaId = this.rl.snapshot.paramMap.get('id')

    this.mensaje = (this.mesaId === 'nueva') ? 'Nueva mesa' : 'Editar mesa';
    
  }

  enviarFormulario(f : NgForm){
    
  }

}
