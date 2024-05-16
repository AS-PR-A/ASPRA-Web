import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url:string = "http://127.0.0.1:8000/api/auth/login/"
  currentUserSubject:BehaviorSubject<any>;
  currentUser: Observable<any>;

  constructor(private http:HttpClient) { 
    console.log("Autenticando...")
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')||'{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(data:any):Observable<any> {
    return this.http.post(this.url,data).pipe(map(response=>{
      sessionStorage.setItem('currentUser',JSON.stringify(data.username)); //Guardamos el username en sessionStorage para buscar el perfil en BD
      this.currentUserSubject.next(response);
      return response;
    }));
  }

  logout(){
    sessionStorage.removeItem('currentUser')
  }
  
  get usuarioAutenticado(): any{
    return this.currentUserSubject.value
  }

 estaAutenticado(): boolean {
  return sessionStorage.getItem("currentUser") !== null;
  }
}
