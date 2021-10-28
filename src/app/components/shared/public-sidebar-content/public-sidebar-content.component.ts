import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IPedidoActivo } from 'src/app/interfaces/pedidoactivo.interface';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-public-sidebar-content',
  templateUrl: './public-sidebar-content.component.html',
  styleUrls: ['./public-sidebar-content.component.styl']
})
export class PublicSidebarContentComponent implements OnInit {

  intervalo : any;
  internalSub! : Subscription;
  datos_pedido : IPedidoActivo[] = [];
  mesaId: string | null = localStorage.getItem('mesaCheckInLS');
  totalPedido: number = 0;
  cargando: boolean = true;

  constructor(private _ps: PedidosService) { }

  // => Funcion que devuelve Observable
  escucharCambiosPedidos(t:number) {
    //Retorno el observable de Mesas
    return new Observable<IPedidoActivo[]>( observer => {
      //Configuro el intervalo cada 5 segundos
      this.intervalo = setInterval(()=> {
        //Ejecuto la consulta a Firebase
        if(this.mesaId){
          this._ps.obtenerPedidos(this.mesaId).subscribe(resp => {;
            observer.next(resp) // => Responso con el observer (a los que esten suscriptos)
          })
        }
      },t);
    } );
  }

  ngOnInit(): void {

    //Ejecuto la funcion para escuchar y me suscribo
    this.internalSub = this.escucharCambiosPedidos(1000).subscribe(data => {
      //Cada 5 segundos me devuelve la data
      this.datos_pedido = data;

      this.totalPedido = 0

      this.datos_pedido.forEach(pedido => {
        this.totalPedido += pedido.precio;
      })

      this.cargando = false;

    });

  }

}
