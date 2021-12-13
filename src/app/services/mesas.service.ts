import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MesaModel } from '../interfaces/mesa.model';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  DB_URL  = environment.DB_URL;
  DB_NODE = environment.DB_NODE;

  constructor(private http: HttpClient) { }

  obtenerMesas(){
    return this.http.get<MesaModel[]>(`${this.DB_URL}${this.DB_NODE}/mesas.json`)
      .pipe(map(this.arreglarObjeto))
  }

  obtenerMesaIndividual(id:any){
    return this.http.get<MesaModel>(`${this.DB_URL}${this.DB_NODE}/mesas/${id}.json`)
  }

  crearMesa(mesa : MesaModel){
    return this.http.post(`${this.DB_URL}${this.DB_NODE}/mesas.json`, mesa)
      .pipe(
        map((resp:any) => {
          mesa.id = resp.name;
          return mesa; //Retorno la mesa
        })
      )
  }

  arreglarObjeto(objetoMesas: any){
    if(objetoMesas === null){return [];}
    //////////////
    const mesas : MesaModel[] = [];

    Object.keys(objetoMesas).forEach( key => {
      const mesa: MesaModel = objetoMesas[key];
      mesa.id = key;
      mesas.push(mesa);
    })

    return mesas;
  }

  actualizarMesa( mesa : MesaModel) {
    
    const mesaTemp : MesaModel = {
      ...mesa
    }
    delete mesaTemp.id;

    return this.http.put(`${this.DB_URL}${this.DB_NODE}/mesas/${mesa.id}.json`,mesaTemp)
  }

  cerrarMesa( mesa : MesaModel , mesaId: string){

    const mesaTemp : MesaModel = {
      ...mesa
    }
    delete mesaTemp.id;
    delete mesaTemp.pedirCuenta;
    delete mesaTemp.ocupada;
    delete mesaTemp.cantidadComensales;
    delete mesaTemp.pedidoactivo;

    return this.http.put(`${this.DB_URL}${this.DB_NODE}/mesas/${mesaId}.json`,mesaTemp)

  }

  eliminarMesa(mesa:MesaModel){
    return this.http.delete<MesaModel>(`${this.DB_URL}${this.DB_NODE}/mesas/${mesa.id}.json`)
  }

  checkInMesa(mesa:MesaModel,mesaId:string, cantidadComensales:number){
    const mesaTemp : MesaModel = {
      ...mesa,
      ocupada: true,
      cantidadComensales: cantidadComensales
    }
    return this.http.put(`${this.DB_URL}${this.DB_NODE}/mesas/${mesaId}.json`,mesaTemp)
  }

  pedirCuentaDeMesa(mesa:MesaModel, mesaId:string | null){
    const mesaTemp : MesaModel = {
      ...mesa,
      pedirCuenta: true
    }
    return this.http.put(`${this.DB_URL}${this.DB_NODE}/mesas/${mesaId}.json`,mesaTemp)
  }

  marcarPagoDeMesa(mesa:MesaModel, mesaId:string, pedidos: any){
    const fechaCobro = new Date();
    //remove property id from every object in pedidos
    const pedidosTemp = pedidos.map((pedido:any) => {
      const pedidoTemp = {
        ...pedido,
        fechaCobro
      }
      delete pedidoTemp.id;
      return pedidoTemp;
    })

    return this.http.post(`${this.DB_URL}${this.DB_NODE}/mesas/${mesaId}/pedidosCobrados.json`, pedidosTemp)

  }

}
