import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MesaModel } from 'src/app/interfaces/mesa.model';
import { RestoData } from 'src/app/models/restaurant.model';
import { MesasService } from 'src/app/services/mesas.service';
import { RestoService } from 'src/app/services/resto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.styl']
})
export class BienvenidaComponent implements OnInit {

  private restoId : string = '';
  private mesaId : string = '';
  public datos_mesa! : MesaModel;
  public datos_resto! : RestoData;

  constructor( private _ms: MesasService,private activatedRoute : ActivatedRoute, private _rs: RestoService ) {
    //Recupero parametros
    this.activatedRoute.params.subscribe(params => {
      this.restoId = params.idResto;
      this.mesaId  = params.idMesa;
    })
    //Recupero datos del restaurant
    this._rs.public_obtenerRestaurant(this.restoId).subscribe(rd => {
      this.datos_resto = rd;
    })
    //Recupero datos de la mesa
    this._ms.obtenerMesaIndividual(this.mesaId).subscribe(mesa => {
      this.datos_mesa = mesa;
    })
  }

  ngOnInit(): void {
  }

  enviarFormulario(f : NgForm){
    
    }


}