import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  mesaId : any | null = '';

  mesa : MesaModel = new MesaModel();

  constructor(private restoService : RestoService, private rl : ActivatedRoute, private mesasService : MesasService, private route: Router) {}
  
  ngOnInit(): void {
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

    this.mesaId = this.rl.snapshot.paramMap.get('id')

    this.mensaje = (this.mesaId === 'nueva') ? 'Nueva mesa' : 'Editar mesa';
    
    if(this.mesaId !== 'nueva'){
      this.mesasService.obtenerMesaIndividual(this.mesaId).subscribe(resp => {
        this.mesa = resp;
        this.mesa.id = this.mesaId
      })
    }

  }

  enviarFormulario(f : NgForm){

    if(f.invalid){ return; }

    if(this.mesa.id){
      this.mesasService.actualizarMesa(this.mesa).subscribe(resp => {
        this.route.navigate(['admin-inicio/ver-mesas'])
      })
    }else{
      this.mesasService.crearMesa(this.mesa).subscribe(resp => {
        this.route.navigate(['admin-inicio/ver-mesas'])
      })    
    }

  }

}
