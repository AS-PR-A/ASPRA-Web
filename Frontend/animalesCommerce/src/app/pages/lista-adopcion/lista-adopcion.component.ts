import { Component, OnInit } from '@angular/core';
import { ListaAdopcionService } from 'src/app/services/lista-adopcion.service';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-lista-adopcion',
  templateUrl: './lista-adopcion.component.html',
  styleUrls: ['./lista-adopcion.component.css']
})
export class ListaAdopcionComponent implements OnInit{

  lista: any;

  isAdmin: boolean = false;

  constructor(private listAdop:ListaAdopcionService, private auth:AuthService) { }

  ngOnInit(): void {
    this.lista = this.listaAdopcion();
    if(this.auth.estaAutenticado()){
      if(sessionStorage.getItem('currentUser') == "\"admin\""){
        this.isAdmin = true
      }
    }
  }

  listaAdopcion():any {
    this.listAdop.verListaAdopcion().subscribe({
      next: (response) => {
        this.lista = response
      },
      error: (errorResponse) => {
        console.error(errorResponse)
      }
    })
  }
  eliminarAnimal(id: number): void {
    if (confirm('¿Estás seguro de eliminar este animal?')) {
      this.listAdop.eliminarAnimal(id).subscribe({
        next: () => {
          alert('Se eliminó el animal correctamente!');
          // Volver a cargar la lista de animales después de eliminar
          this.listaAdopcion();
        },
        error: (error) => {
          console.error('Error al eliminar el animal:', error);
          alert('Ocurrió un error al eliminar el animal. Por favor, inténtalo de nuevo.');
        }
      });
    }
  }

}
