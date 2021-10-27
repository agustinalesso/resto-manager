import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuModel } from 'src/app/interfaces/menu.interface';
import { IPedidoActivo } from 'src/app/interfaces/pedidoactivo.interface';
import { MenuService } from 'src/app/services/menu.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-plato',
  templateUrl: './ver-plato.component.html',
  styleUrls: ['./ver-plato.component.styl']
})
export class VerPlatoComponent implements OnInit {

  menuItemId!: string;
  plato! : MenuModel;
  cargando : boolean = true;
  cantidadAPedir! : number;
  mesaId! : string;

  constructor(private _ms:MenuService, private _ar:ActivatedRoute, private _ps: PedidosService) { 

    this._ar.params.subscribe(params => {
      this.menuItemId = params['id'];
    })

  }

  ngOnInit(): void {

    this._ms.obtenerItemMenu(this.menuItemId).subscribe(respuesta =>{
      this.plato = respuesta;
      this.cargando = false
    })

  }

  agregarAlPedido(){
    if(this.cantidadAPedir > 0){
      const mesaId = localStorage.getItem('mesaCheckInLS')
      if(!mesaId){
        Swal.fire('ERROR','hubo un error al intentar procesar tu mesa','error');
        return;
      }

      const pedido : IPedidoActivo = {
        ext_id: this.menuItemId,
        nombre: this.plato.nombre,
        cantidad: this.cantidadAPedir,
        precio: (this.plato.valor * this.cantidadAPedir),
        entregado: false
      }

      this._ps.enviarPedido(mesaId,pedido).subscribe(respuesta => {
        console.log(respuesta);
      })

    }else{
      Swal.fire('Olvidaste la cantidad','Debes ingresar un valor mayor a cero','warning');
    }
  }

}
