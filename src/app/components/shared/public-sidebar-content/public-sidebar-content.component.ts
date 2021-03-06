import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { arreglarObjeto } from 'src/app/helpers/returndata.helper';
import { MesaModel } from 'src/app/interfaces/mesa.model';
import { IPedidoActivo } from 'src/app/interfaces/pedidoactivo.interface';
import { MesasService } from 'src/app/services/mesas.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';

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
  miMesa!: MesaModel;
  //output para el parent
  @Output() cerrarSidebar: EventEmitter<boolean> = new EventEmitter();

  constructor(private _ps: PedidosService, private _ms:MesasService, private router: Router) { }

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

  pedirCuentaDeMesa(){

    this._ms.obtenerMesaIndividual(this.mesaId).subscribe(resp => {
      this.miMesa = resp;

      this._ms.pedirCuentaDeMesa(this.miMesa,this.mesaId).subscribe(resp => {
        this.cerrarSidebar.emit(true);
        Swal.fire({
          title: 'Cuenta de Mesa',
          text: 'Se ha enviado el pedido de cuenta de la mesa',
          icon: 'success',
          confirmButtonText: 'OK'
        })
      });

    });

  }

  ngOnInit(): void {
    //Ejecuto la funcion para escuchar y me suscribo
    this.internalSub = this.escucharCambiosPedidos(1000).subscribe( async (data) => {
      //Cada 5 segundos me devuelve la data
      this.datos_pedido = await arreglarObjeto(data);
      this.totalPedido = 0
      this.datos_pedido.forEach(pedido => {
        this.totalPedido += pedido.precio;
      })
      this.cargando = false;
      this.miMesa.pedidoactivo = data;

    });

    this._ms.obtenerMesaIndividual(this.mesaId).subscribe(resp => {
      this.miMesa = resp;
    });

  }

  retirarse(){
    this.cerrarSidebar.emit(true);
    //Swal confirmation
    Swal.fire({
      title: 'Retirarse',
      text: '??Est?? seguro que desea retirarse?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, retirarse!'
    }).then((result) => {
      if(result.isConfirmed){
        if(this.mesaId){

          this._ms.obtenerMesaIndividual(this.mesaId).subscribe(resp => {
            this.miMesa = resp;

            const mesa: MesaModel = this.miMesa;

            if(this.mesaId){
              this._ms.cerrarMesa(mesa, this.mesaId).subscribe(resp => {
                Swal.fire(
                  'Retirado',
                  'Se ha retirado la mesa',
                  'success'
                )
  
                //Delete 'public_uid_hash' and 'mesaCheckInLS' from localStorage 
                localStorage.removeItem('public_uid_hash');
                localStorage.removeItem('mesaCheckInLS');
  
                this.router.navigate(['/']);
              });
            }

          });

        }
      }
    });
  }

}
