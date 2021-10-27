import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
    this.internalSub = this.escucharCambiosMesas(5000).subscribe(data => {
      //Cada 5 segundos me devuelve la data
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
    this._ps.obtenerPedidos(mesaId).subscribe( (respuesta:IPedidoActivo[]) => {
      
      let html = `<table class="table table-striped">
                    <thead>
                      <th>Cant.</th>
                      <th>Plato</th>
                      <th>Precio</th>
                      <th>Estado</th>
                    </thead>
                    <tbody>`

      let fila = ``;
      respuesta.forEach(pedido => {

        let msg = pedido.entregado ? '<span class="badge bg-success">Entregado</span>':'<span class="badge bg-danger">Sin entregar</span>'

        fila += `<tr>
                  <td>${pedido.cantidad}</td>
                  <td>${pedido.nombre}</td>
                  <td>$ ${pedido.precio}</td>
                  <td>${msg}</td>
                </tr>`

      })

      html += fila + `</tbody></table>`

      Swal.fire({
        showCloseButton: true,
        width: '70%',
        title: 'Pedido',
        html: html
      })

    })
  }

}
