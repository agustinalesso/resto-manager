import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { arreglarObjeto } from 'src/app/helpers/returndata.helper';
import { MesaModel } from 'src/app/interfaces/mesa.model';
import { IPedidoActivo } from 'src/app/interfaces/pedidoactivo.interface';
import { RestoData } from 'src/app/models/restaurant.model';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { RestoService } from 'src/app/services/resto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.component.html',
  styleUrls: ['./ver-pedidos.component.styl']
})
export class VerPedidosComponent implements OnInit, OnDestroy {

  uid_hash: string | null = null;
  datos_restaurante : RestoData = new RestoData();
  datos_mesas : MesaModel[] = [];
  intervalo : any;
  internalSub! : Subscription;
  carrier_mesa: string = '';
  popupabierto : boolean = false;
  carrier_pedidos: IPedidoActivo[] = [];


  constructor(private restoService : RestoService, private _ms: MesasService, private _ps: PedidosService) {}

  ngOnDestroy(){
    clearInterval(this.intervalo);
    this.internalSub.unsubscribe();
  }

  ngOnInit(): void {
    
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

    this._ms.obtenerMesas().subscribe(resp => {
      this.datos_mesas = resp;
    })

    //Ejecuto la funcion para escuchar y me suscribo
    this.internalSub = this.escucharCambiosMesas(1000).subscribe(data => {
      //Cada 1 segundo me devuelve la data
      data.map( async (item) => {
        if(item.pedidoactivo){
          item.pedidoactivo = await arreglarObjeto(item.pedidoactivo)
          const pedidosSinTomar : any[] = item.pedidoactivo.filter(p => p.entregado == false)
          if(pedidosSinTomar && pedidosSinTomar.length > 0){
            item.pedidosSinEntregar = pedidosSinTomar.length
          }
        }
      })
      this.datos_mesas = data;
    });
  }

  // => Funcion que devuelve Observable
  escucharCambiosMesas(t:number) {
    //Retorno el observable de Mesas
    return new Observable<MesaModel[]>( observer => {
      //Configuro el intervalo cada 5 segundos
      this.intervalo = setInterval(()=> {
        //Ejecuto la consulta a Firebase
        this._ms.obtenerMesas().subscribe(resp => {;
          observer.next(resp) // => Responso con el observer (a los que esten suscriptos)
        })
      },t);
    } );
  }
  
  verPedidosDeMesa(mesaId:any){
    this._ps.obtenerPedidos(mesaId).subscribe( async (respuesta:IPedidoActivo[]) => {
      this.carrier_mesa = mesaId;
      this.carrier_pedidos = await arreglarObjeto(respuesta);
      this.popupabierto = true;
    })
  }

  cerrarPopup(){
    this.popupabierto = false;
  }

  marcarPagoDeMesa(mesa:MesaModel, mesaId:any){
    //Obtengo el pedido activo que es el que tengo que cobrar
    this._ps.obtenerPedidos(mesaId).subscribe( async (respuesta:IPedidoActivo[]) => {
      //lo ajusto con el fixer
      const pedido = await arreglarObjeto(respuesta);
      //marco el pago de la mesa y genero el nuevo registro de pago
      this._ms.marcarPagoDeMesa(mesa,mesaId,pedido).subscribe( async (respuesta:any) => {
        //recupero la mesa ya actualizada
        this._ms.obtenerMesaIndividual(mesaId).subscribe( async (respuesta: MesaModel) => {
          //le quito el pedido activo (porque lo acabo de cobrar y el pedido de cuenta)
          delete respuesta.pedidoactivo;
          delete respuesta.pedirCuenta;
          respuesta.id = mesaId;
          //Actualizo la mesa
          this._ms.actualizarMesa(respuesta).subscribe( async (respuesta:any) => {
            Swal.fire(
              '¡Éxito!',
              'Hemos notificado a la mesa que el abono se ha realizado',
              'success'
            );
          });
        })
      
      });
    })
  }

}
