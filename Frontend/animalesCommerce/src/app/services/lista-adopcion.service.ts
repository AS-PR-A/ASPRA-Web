import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaAdopcionService {
  url: string = 'http://127.0.0.1:8000/api/';
  constructor(private http: HttpClient) {}

  verListaAdopcion(): Observable<any> {
    return this.http.get<any>(this.url + 'pages/animales/listado/');
  }

  agregar(data: any): Observable<any> {
    return this.http.post(this.url + 'pages/animales/agregar/', data);
  }

  // Código añadido

  modificarAnimal(id: number, data: any): Observable<any> {
    return this.http.put(`${this.url}pages/animales/modificar/${id}/`, data);
  }
  
  eliminarAnimal(id: number): Observable<any> {
    return this.http.delete(`${this.url}pages/animales/${id}/`);
  }
}
