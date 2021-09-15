import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { MenuModel } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private DB_URL = environment.DB_URL;
  private DB_NODE = environment.DB_NODE;

  constructor( private http : HttpClient ) {}

  obtenerMenu() {
    return this.http.get<MenuModel[]>(`${this.DB_URL}${this.DB_NODE}/menu.json`)
      .pipe(map(this.arreglarObjeto));
  }

  obtenerItemMenu( id : string ){
    return this.http.get<MenuModel>(`${this.DB_URL}${this.DB_NODE}/menu/${id}.json`);
  }

  guardarItemMenu( menu: MenuModel ){
    return this.http.post<MenuModel>(`${this.DB_URL}${this.DB_NODE}/menu.json`,menu)
      .pipe(
        map((resp:any) => {
          menu.id = resp.name;
          return menu;
        })
      )
  }

  actualizarItemMenu( menu: MenuModel ){
    const menuTemp = {...menu}
    delete menuTemp.id
    return this.http.put<MenuModel>(`${this.DB_URL}${this.DB_NODE}/menu/${menu.id}.json`, menuTemp);
  }

  eliminarItemMenu( menu:MenuModel ){
    return this.http.delete<MenuModel>(`${this.DB_URL}${this.DB_NODE}/menu/${menu.id}.json`);
  }

  arreglarObjeto(objetoMenu: any){
    if(objetoMenu === null){return [];}

    const menus : MenuModel[] = [];

    Object.keys(objetoMenu).forEach( key => {
      const menu: MenuModel = objetoMenu[key];
      menu.id = key;
      menus.push(menu);
    })

    return menus;
  }

}
