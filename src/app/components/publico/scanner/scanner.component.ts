import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.styl']
})
export class ScannerComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  scanTable(){
    this.router.navigateByUrl('/inicio/bienvenida/TzemiTLuoDbtBEn7kk0d6Tor6as1/-MkEJM0v1DuvrPveJBJV')
  }

}
