import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { MiCuentaService } from 'src/app/services/mi-cuenta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit{
  form;
  perfil: any;
  user = sessionStorage.getItem("currentUser")

  constructor(private formBuilder:FormBuilder, private miCuenta:MiCuentaService, private router:Router) {

    this.form=this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      apellido:['',[Validators.required, Validators.minLength(3), Validators.maxLength(300)]],
      telefono:['',[Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      direccion: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-zA-Z]).{3,}$')]],
      ciudad: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      provincia: ['', Validators.required],
      usuario: []
    })
  }

  ngOnInit(): void {
    this.perfil = this.verPerfil();
  }

  verPerfil():any {
    this.miCuenta.verPerfil().subscribe({
      next: (response) => {
        this.perfil = response
      },
      error: (errorResponse) => {
        console.error(errorResponse)
      }
    })
  }

  get nombre(){
    return this.form.get("nombre")
  }
  get apellido(){
    return this.form.get("apellido")
  }
  get telefono(){
    return this.form.get("telefono")
  }
  get direccion(){
    return this.form.get("direccion")
  }
  get ciudad(){
    return this.form.get("ciudad")
  }
  get provincia(){
    return this.form.get("provincia")
  }

  onEnviar(event:Event){
    event.preventDefault();
    if (this.form.valid) {
      this.form.value.usuario = this.perfil.usuario
      this.miCuenta.modificarPerfil(this.form.value).subscribe({
        next: (response) => {
          if (response){
            alert("Se actualizo perfil!");
            this.router.navigate(['/listaAdopcion/'])
          } 
        }
      })
    }
    this.form.markAllAsTouched()
  } 
}
