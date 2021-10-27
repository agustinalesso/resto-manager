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
    return this.http.get<IPedidoActivo[]>(`${environment.DB_URL}${environment.DB_NODE}/mesas/${mesaId}/pedidoactivo.json`)
            .pipe(map(arreglarObjeto));
  }

  enviarPedido(mesaId:string, pedido:IPedidoActivo){
    return this.http.post<IPedidoActivo>(`${environment.DB_URL}${environment.DB_NODE}/mesas/${mesaId}/pedidoactivo.json`, pedido)
  }

}
