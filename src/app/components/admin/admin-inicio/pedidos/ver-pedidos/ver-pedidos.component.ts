import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { arreglarObjeto } from 'src/app/helpers/returndata.helper';
import { MesaModel } from 'src/app/interfaces/mesa.model';
import { IPedidoActivo } from 'src/app/interfaces/pedidoactivo.interface';
import { RestoData } from 'src/app/models/restaurant.model';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { RestoService } from 'src/app/services/resto.service';

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
      //Cada 5 segundos me devuelve la data

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

  public static entregarPedido(index:number){
    console.log(index);
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

}
