import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuModel } from 'src/app/interfaces/menu.interface';
import { RestoData } from 'src/app/models/restaurant.model';
import { MenuService } from 'src/app/services/menu.service';
import { RestoService } from 'src/app/services/resto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-menu',
  templateUrl: './ver-menu.component.html',
  styleUrls: ['./ver-menu.component.styl']
})
export class VerMenuComponent implements OnInit {

  datos_restaurante : RestoData = new RestoData();
  datos_menu : MenuModel[] = [];
  cargando = true;

  constructor(private restoService : RestoService, private menuService : MenuService, private router : Router){}

  ngOnInit(): void {
    
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

    this.menuService.obtenerMenu().subscribe(data => {
      this.datos_menu = data;
      this.cargando = false;
    })

  }

  crearNuevoMenu(){
    this.router.navigate( ['admin-inicio/menu','nueva'] );
  }

  editarMenu(menu : MenuModel){
    this.router.navigate(['admin-inicio/menu', menu.id]);
  }

  eliminarMenu(menu:MenuModel){
    Swal.fire({
      title: '¿Está seguro que desea eliminar este item de menú?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Borrar',
      denyButtonText: 'No borrar',
    }).then((result) => {
      if(result.isConfirmed){
        this.menuService.eliminarItemMenu(menu).subscribe(res => {;
          const idx : number = this.datos_menu.indexOf(menu);
          this.datos_menu.splice(idx,1);
          Swal.close();
        });
      }else if(result.isDenied){
        Swal.close();
      }
    })
  }

}
