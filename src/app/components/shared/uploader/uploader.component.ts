import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArchivoModel } from 'src/app/models/archivo.model';
import { CargarArchivosService } from 'src/app/services/cargar-archivos.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.styl']
})
export class UploaderComponent implements OnInit {

  estaSobreDrop : boolean = false;
  archivos : ArchivoModel[] = [];

  @Output() emisorDeArchivos : EventEmitter<ArchivoModel[]> = new EventEmitter();

  constructor( private _cs : CargarArchivosService ) { }

  ngOnInit(): void {
  }

  get progresoFinalizado(){
    for(let a of this.archivos){
      if(a.estaSubiendo){
        return false;
      }
    }
    return true;
  }

  async cargarImagenesAFirebase(){
    await this._cs.cargarAFirebase(this.archivos).then(data => {
      this.archivos = data;
      this.emisorDeArchivos.emit(this.archivos)
    })
  }

  limpiarArchivos(){
    this.archivos = [];
  }

}
