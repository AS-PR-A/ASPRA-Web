import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogged: boolean = true
constructor(private auth:AuthService){
  this.isLogged = this.auth.estaAutenticado
}
logout(event:Event){
  this.auth.logout()
}

}
