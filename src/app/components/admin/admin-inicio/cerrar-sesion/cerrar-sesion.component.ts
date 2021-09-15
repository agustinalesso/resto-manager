import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoData } from 'src/app/models/restaurant.model';
import { AuthService } from 'src/app/services/auth.service';
import { RestoService } from 'src/app/services/resto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.styl']
})
export class CerrarSesionComponent implements OnInit {

  uid_hash: string | null = null;
  datos_restaurante : RestoData = new RestoData();

  constructor(private restoService : RestoService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

  }

  cerrarSesion(){
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Está seguro que desea cerrar sesión?',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then(respuesta => {
      if(respuesta.isConfirmed){
        this.authService.logOut();
        this.router.navigate(['****'])
      }else{
        Swal.close();
      }
    })
  }

}
