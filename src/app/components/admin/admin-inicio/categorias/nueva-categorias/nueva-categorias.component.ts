import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaModel } from 'src/app/interfaces/categorias.interface';
import { RestoData } from 'src/app/models/restaurant.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { RestoService } from 'src/app/services/resto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-categorias',
  templateUrl: './nueva-categorias.component.html',
  styleUrls: ['./nueva-categorias.component.styl']
})
export class NuevaCategoriasComponent implements OnInit {

  datos_restaurante : RestoData = new RestoData();
  mensaje : string = '';
  categId : any | null  = '';
  categoria : CategoriaModel = {
    nombre: ''
  }

  constructor(  private restoService : RestoService,
                private rl : ActivatedRoute,
                private _cs: CategoriasService,
                private route : Router ) {}

  ngOnInit(): void {
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

    this.categId = this.rl.snapshot.paramMap.get('id');
    this.mensaje = (this.categId === 'nueva') ? 'Nueva categoría' : 'Editar categoría';

    if(this.categId !== 'nueva'){
      this._cs.obtenerCategoriaIndividual(this.categId).subscribe(resp => {
        this.categoria = resp;
        this.categoria.id = this.categId;
      })
    }

  }

  enviarFormulario(form:NgForm){
    if(form.invalid){
      Swal.fire('Error','Debe ingresar el nombre de la categoría','error');  
      return;
    }

    //Primero recupero los datos de las mesas existentes
    let tempCategorias : CategoriaModel[] = [];
    let yaExiste : boolean = false;
    this._cs.obtenerCategorias().subscribe(resp => {
      tempCategorias = resp;
      //Ahora recorro los datos
      for(let cat of tempCategorias){
        if(cat.nombre.toLowerCase() === this.categoria.nombre.toLowerCase()){
          //Si coincidieron es porque ya hay un categoria igual
          yaExiste = true;
          break;
        }
      }
      if(this.categoria.id){
        this._cs.actualizarCategoria(this.categoria).subscribe(resp => {
          this.route.navigate(['admin-inicio/ver-categorias'])
        })
      }else{
        if(yaExiste === false){
          this._cs.nuevaCategoria(this.categoria).subscribe(resp => {
            this.route.navigate(['admin-inicio/ver-categorias'])
          })
        }else{
          Swal.fire('Error','Ya existe una categoría con ese nombre!','error');
        }
        //Nueva categoria
      }

    })


  }

}
