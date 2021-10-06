import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuModel } from 'src/app/interfaces/menu.interface';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-ver-plato',
  templateUrl: './ver-plato.component.html',
  styleUrls: ['./ver-plato.component.styl']
})
export class VerPlatoComponent implements OnInit {

  menuItemId!: string;
  plato! : MenuModel;
  cargando : boolean = true;

  constructor(private _ms:MenuService, private _ar:ActivatedRoute) { 

    this._ar.params.subscribe(params => {
      this.menuItemId = params['id'];
    })

  }

  ngOnInit(): void {

    this._ms.obtenerItemMenu(this.menuItemId).subscribe(respuesta =>{
      this.plato = respuesta;
      this.cargando = false
    })

  }

}
