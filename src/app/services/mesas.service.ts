import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MesaModel } from '../models/mesa.model';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  DB_URL  = environment.DB_URL;
  DB_NODE = environment.DB_NODE;

  constructor(private http: HttpClient) { }

  crearMesa(mesa : MesaModel){
    return this.http.post(`${this.DB_URL}${this.DB_NODE}/mesas.json`,mesa)
      .pipe(
        map((resp:any) => {
          mesa.id = resp.name;
          return mesa; //Retorno la mesa
        })
      )
  }

  actualizarMesa( mesa : MesaModel) {
    const mesaTemp = {
      ...mesa
    }
    delete mesaTemp.id;
    return this.http.put(`${this.DB_URL}${this.DB_NODE}/mesas/${mesa.id}.json`,mesaTemp)
  }

}
