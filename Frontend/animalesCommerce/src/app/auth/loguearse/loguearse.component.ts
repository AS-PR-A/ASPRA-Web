import { Component} from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loguearse',
  templateUrl: './loguearse.component.html',
  styleUrls: ['./loguearse.component.css']
})
export class LoguearseComponent {

  form;

  constructor(private formBuilder:FormBuilder, private auth:AuthService, private router:Router) {
    this.form=this.formBuilder.group({
      username:['',Validators.required],
      password:['',[Validators.required, Validators.minLength(8)]]
    })
  }

  get username(){
    return this.form.get("username")
  }

  get password(){
    return this.form.get("password")
  }

  onEnviar(event:Event){
    event.preventDefault();
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe(
        { next: (response) => {
          if (response){
            alert("Inicio aprobado!");
            console.log("DATA" + JSON.stringify(response));
            this.router.navigate(['/miCuenta/']).then(() => {
              location.reload();
            });
          } 
        },
        error: () => {
          alert("Credenciales incorrectas...")
        }}
      )
    }
    this.form.markAllAsTouched()
  }

}
