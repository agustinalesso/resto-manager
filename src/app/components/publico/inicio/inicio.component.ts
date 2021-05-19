import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestoService } from 'src/app/services/resto.service';
import firebase from 'firebase'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.styl']
})
export class InicioComponent {

  idMesa!   : number;
  idMenu!   : any;
  idResto!  : string;
  restoData!: any;
  mesas!    : any[];

  mensajeBienvenida! : string;

  constructor(private activatedRoute : ActivatedRoute, private restoService : RestoService) { }

/*   cargarBienvenida(idMesa:number,idResto:number){
    
  } */

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.idMesa = params['idMesa'];
      this.idResto = params['idResto'];
      
      this.restoService.obtenerRestaurant(this.idResto)?.get().then(data => {

        this.restoData = {
          id : data.id,
          ...data.data()
        };
        
      this.restoService.obtenerMenuResto(this.idResto)
      .onSnapshot(snap => {
        snap.forEach(snapHijo => {
          this.idMenu = {
            id : snapHijo.id,
            ...snapHijo.data()
          }
        })
      })

      this.restoService.obtenerMesas(this.idResto)?.onSnapshot((snap:any) => {
        const mesazas : any[] = [];
        snap.forEach((snapHijo:any) => {
          mesazas.push({
            id : snapHijo.id,
            ...snapHijo.data()
          })
        })
        this.mesas = mesazas

      })
        
      }).catch(err => {console.error(err)})    

    })
  }

}
