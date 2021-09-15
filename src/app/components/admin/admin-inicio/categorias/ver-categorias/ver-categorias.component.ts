import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaModel } from 'src/app/interfaces/categorias.interface';
import { RestoData } from 'src/app/models/restaurant.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { RestoService } from 'src/app/services/resto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-categorias',
  templateUrl: './ver-categorias.component.html',
  styleUrls: ['./ver-categorias.component.styl']
})
export class VerCategoriasComponent implements OnInit {

  cargando = true;
  datos_restaurante : RestoData = new RestoData();
  categorias : CategoriaModel[] = [];
  
  constructor( private restoService : RestoService, 
               private categService : CategoriasService,
               private router: Router) {}

  ngOnInit(): void {
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

    this.categService.obtenerCategorias().subscribe(resp => {
      this.categorias = resp;
      this.cargando = false;
    })
  }

  crearNuevaCategoria(){
    this.router.navigate( ['admin-inicio/categoria','nueva'] );
  }

  editarCategoria(cate : CategoriaModel){
    this.router.navigate( ['admin-inicio/categoria',cate.id])
  }

  eliminarCategoria(cate:CategoriaModel){
    Swal.fire({
      title: '¿Está seguro que desea borrar esta categoría?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Borrar`,
      denyButtonText: `NO borrar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.categService.borrarCategoria(cate).subscribe(resp => {})
        const index = this.categorias.indexOf(cate)
        this.categorias.splice(index,1);
        Swal.close();
      } else if (result.isDenied) {
        Swal.close();
      }
    })
  }

}
