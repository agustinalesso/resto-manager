import { Component, OnInit } from '@angular/core';
import { MesaModel } from 'src/app/interfaces/mesa.model';
import { RestoData } from 'src/app/models/restaurant.model';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-ver-movimientos',
  templateUrl: './ver-movimientos.component.html',
  styleUrls: ['./ver-movimientos.component.styl']
})
export class VerMovimientosComponent implements OnInit {

  uid_hash: string | null = null;
  datos_restaurante : RestoData = new RestoData();
  datos_mesas : MesaModel[] = [];
  intervalo : any;
  carrier_mesa: string = '';
  popupabierto : boolean = false;

  constructor(private restoService : RestoService, private _ms: MesasService, private _ps: PedidosService) {}

  ngOnInit(): void {
    
    this.restoService.obtenerRestaurant().subscribe(resp => {
      this.datos_restaurante = resp;
    })

    this._ms.obtenerMesas().subscribe(resp => {
      this.datos_mesas = resp;
    })

    
  }
  
  verPedidosDeMesa(mesaId:any){
    this.popupabierto = true;
    this.carrier_mesa = mesaId;
  }

  cerrarPopup(){
    this.popupabierto = false;
  }

}
