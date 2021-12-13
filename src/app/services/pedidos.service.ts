import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { arreglarObjeto } from '../helpers/returndata.helper';
import { IPedidoActivo } from '../interfaces/pedidoactivo.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor( private http : HttpClient ) { }

  obtenerPedidos(mesaId:string){
    return this.http.get<IPedidoActivo[]>(`${environment.DB_URL}${environment.DB_NODE}/mesas/${mesaId}/pedidoactivo.json`);
  }

  enviarPedido(mesaId:string, pedido:IPedidoActivo){
    return this.http.post<IPedidoActivo>(`${environment.DB_URL}${environment.DB_NODE}/mesas/${mesaId}/pedidoactivo.json`, pedido)
  }

  entregarPedido(mesaId:string, pedido:IPedidoActivo, pedidoId: string){
    return this.http.put<IPedidoActivo>(`${environment.DB_URL}${environment.DB_NODE}/mesas/${mesaId}/pedidoactivo/${pedidoId}.json`, pedido)
  }

  obtenerPedidosCobrados(mesaId:string){
    return this.http.get(`${environment.DB_URL}${environment.DB_NODE}/mesas/${mesaId}/pedidosCobrados.json`);
  }

}
