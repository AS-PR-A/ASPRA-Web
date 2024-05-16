import { Component, OnInit } from '@angular/core';
import { RefugiosService } from 'src/app/services/refugios.service';

@Component({
  selector: 'app-refugios',
  templateUrl: './refugios.component.html',
  styleUrls: ['./refugios.component.css'],
})
export class RefugiosComponent implements OnInit {
  lista: any;

  constructor(private listRef: RefugiosService) {}

  ngOnInit(): void {
    this.lista = this.listaRefugios();
  }

  listaRefugios(): any {
    this.listRef.verRefugios().subscribe({
      next: (response) => {
        this.lista = response;
      },
      error: (errorResponse) => {
        console.error(errorResponse);
      },
    });
  }
}
