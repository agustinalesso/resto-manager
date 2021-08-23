import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CategoriaModel } from '../interfaces/categorias.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private DB_URL  = environment.DB_URL;
  private DB_NODE = environment.DB_NODE;

  constructor(private http: HttpClient) { }

  obtenerCategorias(){
    return this.http.get<CategoriaModel[]>(`${this.DB_URL}${this.DB_NODE}/categorias.json`)
      .pipe(map(this.arreglarObjeto))
  }

  obtenerCategoriaIndividual(id:string){
    return this.http.get<CategoriaModel>(`${this.DB_URL}${this.DB_NODE}/categorias/${id}.json`)
  }

  actualizarCategoria(categoria : CategoriaModel){
    const categoriaTemp : CategoriaModel = {
      ...categoria
    }
    delete categoriaTemp.id
    return this.http.put<CategoriaModel>(`${this.DB_URL}${this.DB_NODE}/categorias/${categoria.id}.json`,categoriaTemp)
  }

  borrarCategoria(categoria: CategoriaModel){
    return this.http.delete<CategoriaModel>(`${this.DB_URL}${this.DB_NODE}/categorias/${categoria.id}.json`)
  }

  nuevaCategoria(categoria : CategoriaModel){
    return this.http.post<CategoriaModel>(`${this.DB_URL}${this.DB_NODE}/categorias.json`,categoria)
      .pipe(
        map((resp:any) => {
          categoria.id = resp.name;
          return categoria; //Retorno la categoria
        })
      )
  }

  private arreglarObjeto(objetoCats: any){
    if(objetoCats === null){return [];}
    //////////////
    const cats : CategoriaModel[] = [];

    Object.keys(objetoCats).forEach( key => {
      const cat: CategoriaModel = objetoCats[key];
      cat.id = key;
      cats.push(cat);
    })

    return cats;
  }

}
