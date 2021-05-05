import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.styl']
})
export class InicioComponent {

  idMesa! : number;
  idResto!: number;

  mensajeBienvenida : string = ``;

  constructor(private activatedRoute : ActivatedRoute, private restoService : RestoService) { }

  cargarBienvenida(idMesa:number,idResto:number){
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.idMesa = params['idMesa'];
      this.idResto = params['idResto'];
    })

    this.restoService._functionTest();

  }

}
