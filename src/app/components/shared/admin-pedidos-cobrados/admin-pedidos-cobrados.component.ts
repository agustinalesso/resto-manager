import { Component, Input, OnInit } from '@angular/core';
import { MesaModel } from 'src/app/interfaces/mesa.model';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-admin-pedidos-cobrados',
  templateUrl: './admin-pedidos-cobrados.component.html',
  styleUrls: ['./admin-pedidos-cobrados.component.styl']
})
export class AdminPedidosCobradosComponent implements OnInit {

  @Input() mesaId?: string;
  mesa?: MesaModel;
  pedidosCobrados: any[] = [];
  totalDeLaMesa: number = 0;

  constructor( private _ms : MesasService, private _ps: PedidosService) { }

  ngOnInit(): void {
    
    this._ms.obtenerMesaIndividual(this.mesaId).subscribe( mesa => {
      this.mesa = mesa;
    });

    if(this.mesaId){
      this._ps.obtenerPedidosCobrados(this.mesaId).subscribe( (pedidos:any) => {
        
        const item : any[] = [];
        Object.keys(pedidos).forEach( key => {
          const obj = pedidos[key];
          item.push(obj);
        })

        //Aca ya tengo todos los pedidos cobrados con todos sus items. Les voy a agregar la fecha en la cabecera
        const pedidosCobrados = item.map( pedido => {
          pedido.fecha = pedido[0].fechaCobro;
          //Sumo todos los precios de los items dentro de pedido
          pedido.precioTotal = pedido.reduce( (acumulador:number, item:any) => {
            return acumulador + item.precio;
          }, 0);
          return pedido;
        });

        this.pedidosCobrados = pedidosCobrados;

        //Sumo todos los precios de los pedidos cobrados
        pedidosCobrados.forEach( pedido => {
          this.totalDeLaMesa += pedido.precioTotal;
        });

      });
    }
  }

}
