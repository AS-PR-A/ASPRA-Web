import { Component, OnInit } from '@angular/core';
import { DonacionesService } from 'src/app/services/donaciones.service';

@Component({
  selector: 'app-donaciones',
  templateUrl: './donaciones.component.html',
  styleUrls: ['./donaciones.component.css'],
})
export class DonacionesComponent implements OnInit {
  lista: any;

  constructor(private listDona: DonacionesService) {}

  ngOnInit(): void {
    this.listaDonaciones();
  }

  listaDonaciones(): void {
    this.listDona.verDonaciones().subscribe({
      next: (response) => {
        this.lista = response;
        console.log(this.lista.data)
      },
      error: (errorResponse) => {
        console.error(errorResponse);
      },
    });
  }
}
