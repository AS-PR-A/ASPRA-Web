import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogged: boolean = false

constructor(private auth:AuthService, private router: Router){
}

ngOnInit(): void {
  this.isLogged = this.auth.estaAutenticado()
}

logout(){
  this.auth.logout()
  window.location.reload();
}

}
