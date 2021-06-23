import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestoData } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestoService {

  DB_URL  = 'https://isp20-828cd-default-rtdb.firebaseio.com/resto/';
  DB_NODE = localStorage.getItem('uid_hash');

  constructor(private http: HttpClient) { }

  obtenerRestaurant(){
      return this.http.get<RestoData>(`${this.DB_URL}${this.DB_NODE}.json`)
  }

}
