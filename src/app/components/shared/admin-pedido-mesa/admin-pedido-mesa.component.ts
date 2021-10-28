import { Component, Input, OnInit } from '@angular/core';
import { MesaModel } from 'src/app/interfaces/mesa.model';
import { IPedidoActivo } from 'src/app/interfaces/pedidoactivo.interface';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-admin-pedido-mesa',
  templateUrl: './admin-pedido-mesa.component.html',
  styleUrls: ['./admin-pedido-mesa.component.styl']
})
export class AdminPedidoMesaComponent implements OnInit {

  @Input() mesaId: string = '';
  @Input() pedidos: IPedidoActivo[] = [];

  mesa! : MesaModel;

  constructor(private _ms:MesasService,private _ps: PedidosService) {
  }
  
  ngOnInit(): void {
    
    this._ms.obtenerMesaIndividual(this.mesaId).subscribe(respuesta => {
      this.mesa = respuesta;
    })
  }

  entregarPedido(i:number) {
    let pedido = this.pedidos[i];
    let pedidoId = this.pedidos[i].id
    pedido.entregado = true;
    delete pedido.id
    if(pedidoId){
      this._ps.entregarPedido(this.mesaId,pedido,pedidoId).subscribe(respuesta => {
        console.log(respuesta);
        this.pedidos[i].entregado = true;
      })
    }else{
      console.error('PedidoId no existe')
    }
  }

}
