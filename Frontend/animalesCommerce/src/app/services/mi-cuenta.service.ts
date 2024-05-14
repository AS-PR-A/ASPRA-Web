import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MiCuentaService {

  url:string = "http://127.0.0.1:8000/api/pages/perfiles/"

  user = sessionStorage.getItem("currentUser")

  data: any

  constructor(private http: HttpClient) {}

  verPerfil():Observable<any> {
    return this.http.get<any>(this.url + this.user + "/");
  }

  modificarPerfil(data:any):Observable<any>{
    return this.http.put(this.url + "modificar/" + this.user + "/",data)
  }
}
