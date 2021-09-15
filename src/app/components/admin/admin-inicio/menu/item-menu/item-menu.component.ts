import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuModel } from 'src/app/interfaces/menu.interface';
import { RestoData } from 'src/app/models/restaurant.model';
import { MenuService } from 'src/app/services/menu.service';
import { RestoService } from 'src/app/services/resto.service';
import { CategoriaModel } from 'src/app/interfaces/categorias.interface';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ArchivoModel } from 'src/app/models/archivo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.styl']
})
export class ItemMenuComponent implements OnInit {

  datos_restaurante : RestoData = new RestoData();

  mensaje : string = '';
  menuId : any | null = '';
  categorias : CategoriaModel[] = [];
  
  menu : MenuModel = {
    nombre: '',
    disponibilidad: true,
    descripcion: '',
    imagenUrl: [],
    categoria: ''
  }

  constructor(private restoService : RestoService, private rl : ActivatedRoute, private menuService : MenuService, private route: Router, private categoriasService : CategoriasService) { }

  ngOnInit(): void {
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })
    this.menuId = this.rl.snapshot.paramMap.get('id')
    this.mensaje = (this.menuId === 'nueva') ? 'Nuevo item de menú' : 'Editar item de menú';

    this.categoriasService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    })

    if(this.menuId !== 'nueva'){
      this.menuService.obtenerItemMenu(this.menuId).subscribe(resp => {
        this.menu = {...resp,id:this.menuId};
      })
    }

  }

  obtenerRespuestaDeArchivos( event:ArchivoModel[] ){
    this.menu.imagenUrl = event;
  }

  enviarFormulario(f : NgForm){
    if(f.invalid){
      Swal.fire('Error','Te faltan campos obligatorios!','error');
      return;
    }

    if(this.menu.id){
      this.menuService.actualizarItemMenu(this.menu).subscribe(res => {
        this.irAMenu();
      });
    }else{
      this.menuService.guardarItemMenu(this.menu).subscribe(res => {
        this.irAMenu();
      })
    }
    
  }

private irAMenu(){
  this.route.navigate(['admin-inicio/ver-menu']);
}

}
