import { Component, OnInit } from '@angular/core';
import { RestoService } from 'src/app/services/resto.service';

@Component({
  selector: 'app-admin-inicio',
  templateUrl: './admin-inicio.component.html',
  styleUrls: ['./admin-inicio.component.styl']
})
export class AdminInicioComponent implements OnInit {

  constructor(private restoService : RestoService) { }

  ngOnInit(): void {

  }

}
