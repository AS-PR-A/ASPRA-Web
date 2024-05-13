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
  loggedIn: boolean = false;
  constructor(private http:HttpClient) { 
    console.log("Autenticando...")
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')||'{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(data:any):Observable<any> {
    return this.http.post(this.url,data).pipe(map(response=>{
      localStorage.setItem('currentUser',data.username); //Guardamos el username en localStorage para buscar el perfil en BD
      this.currentUserSubject.next(response);
      this.loggedIn = true;
      return response;
    }));
  }

  logout(): void{
    localStorage.removeItem('currenUser');
    this.loggedIn = false;
  }
  
  get usuarioAutenticado(): any{
    return this.currentUserSubject.value;
  }

  get estaAutenticado(): boolean {
    return this.loggedIn;
  }
}
