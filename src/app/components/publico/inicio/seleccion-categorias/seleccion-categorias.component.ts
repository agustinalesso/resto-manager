import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaModel } from 'src/app/interfaces/categorias.interface';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-seleccion-categorias',
  templateUrl: './seleccion-categorias.component.html',
  styleUrls: ['./seleccion-categorias.component.styl']
})
export class SeleccionCategoriasComponent implements OnInit {

  categorias: CategoriaModel[] = [];

  constructor(private _cs: CategoriasService, private _r:Router) {}

  ngOnInit(): void {
    this._cs.obtenerCategorias().subscribe(resp => {
      this.categorias = resp;
    })
  }

  verCategoriaMenu(categ:string){
    this._r.navigate(['inicio/categoria-menu',categ.toLowerCase()])
  }

}
