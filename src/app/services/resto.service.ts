import { Injectable } from '@angular/core';
import db from '../models/database.model';

@Injectable({
  providedIn: 'root'
})
export class RestoService {

  database = db;

  usuarioEjemplo = {
    nombre: 'Matias',
    apellido: 'Sabino',
    edad: 34,
    email: 'agustinalesso23@gmail.com'
  }

  constructor() { }

/*   _functionTest(){
    this.database
      .collection('pepito')
      .add(this.usuarioEjemplo)
      .then(res => {
        console.log(res);
      }).catch(e => {
        console.log('error', e);
      })
  } */

}
