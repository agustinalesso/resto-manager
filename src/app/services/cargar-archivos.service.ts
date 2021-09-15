import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { environment } from 'src/environments/environment';
import { ArchivoModel } from '../models/archivo.model';

@Injectable({
  providedIn: 'root'
})
export class CargarArchivosService {

  private carpetaImagenes = '/uploads';

  constructor() {
    firebase.default.initializeApp(environment.firebaseConfig);
  }

  async cargarAFirebase( archivos : ArchivoModel[] ){
    //Subir los archivos a FireBase
    const referenciaAlmacenamiento = firebase.default.storage().ref();
    //Itero en cada archivo que vino por parametro
    for( const item of archivos ){
      //Marco que se esta subiendo
      item.estaSubiendo = true;
      //Si ya llegó a 100 el pogreso, continúa (pasa a la siguiente iteración)
      if(item.progreso >= 100){
        continue;
      }
      //Aca creo la tarea de subida con la ruta en donde va a estar mi
      //archivo en firebase
      const tareaDeSubida : firebase.default.storage.UploadTask = 
            referenciaAlmacenamiento.child(`${this.carpetaImagenes}/${item.nombre}`)
            .put(item.archivo);
      //Aca voy a escuchar si hay cambio de estado en la tarea
      tareaDeSubida.on(  
        firebase.default.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
        },
        (error) => console.error('Error al subir', error),
        () => {
          tareaDeSubida.snapshot.ref.getDownloadURL()
          .then(data => {
            item.url = data;
            item.estaSubiendo = false;
          }).catch(err => console.error('Error al devolver URL', err));
        }
      )      
    }
    return archivos;
  }

}
