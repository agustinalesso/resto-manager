import { Injectable } from '@angular/core';
import db from '../models/database.model';

@Injectable({
  providedIn: 'root'
})
export class RestoService {

  private restaurantes = db.collection('restos');
  private id : string = '';
  idMenu : string = '';

  constructor() { }

  obtenerRestaurant(restoId?:string){
      return this.restaurantes.doc(restoId)
  }
  obtenerRestaurantes(){
    return this.restaurantes.get()
  }

  obtenerRestoPorEmail(email:string){
    let datos : any;
    let identificador : string;
    this.restaurantes.get().then(d => {
      d.forEach(dh => {
        datos = dh.data()
        if(datos['email'] == email){
          identificador = dh.id
        }
      })
      return identificador;
    })
  }

  obtenerMesas(restoId?:string){
    return this.restaurantes.doc(restoId).collection('mesas')
  }

  obtenerMenuResto(idResto:string){
    return this.restaurantes.doc(idResto).collection('menu')
  }
}
