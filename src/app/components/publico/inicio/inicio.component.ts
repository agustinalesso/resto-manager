import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.styl']
})
export class InicioComponent {

  private _idMesa! : number;
  private _idResto!: number;

  mensajeBienvenida : string = ``;

  constructor(private activatedRoute : ActivatedRoute, private restoService : RestoService) { }

  cargarBienvenida(idMesa:number,idResto:number){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this._idMesa = params['idMesa'];
      this._idResto = params['idResto'];
      this.cargarBienvenida(this._idMesa,this._idResto);
    })
  }

}
