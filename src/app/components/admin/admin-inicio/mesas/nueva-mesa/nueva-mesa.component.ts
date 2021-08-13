import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MesaModel } from 'src/app/models/mesa.model';
import { RestoData } from 'src/app/models/restaurant.model';
import { MesasService } from 'src/app/services/mesas.service';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-nueva-mesa',
  templateUrl: './nueva-mesa.component.html',
  styleUrls: ['./nueva-mesa.component.styl']
})
export class NuevaMesaComponent implements OnInit {

  datos_restaurante : RestoData = new RestoData();

  mensaje : string = '';
  mesaId : string | null = '';

  mesa : MesaModel = new MesaModel();

  constructor(private restoService : RestoService, private rl : ActivatedRoute, private mesasService : MesasService) {}
  
  ngOnInit(): void {
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

    this.mesaId = this.rl.snapshot.paramMap.get('id')

    this.mensaje = (this.mesaId === 'nueva') ? 'Nueva mesa' : 'Editar mesa';
    
  }

  enviarFormulario(f : NgForm){

    if(f.invalid){ return; }

    if(this.mesa.id){
      //ACTUALIZAR
    }else{
      this.mesasService.crearMesa(this.mesa).subscribe(resp => {
        console.log(resp);
      })    
    }

  }

}
