import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-sidebar',
  templateUrl: './public-sidebar.component.html',
  styleUrls: ['./public-sidebar.component.styl']
})
export class PublicSidebarComponent implements OnInit {

  expandido:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  expandirColapsar(){
    this.expandido = !this.expandido
  }

}
