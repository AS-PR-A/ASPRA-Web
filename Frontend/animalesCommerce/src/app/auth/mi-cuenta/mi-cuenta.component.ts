import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { MiCuentaService } from 'src/app/services/mi-cuenta.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit{
  form;
  perfil: any;
  constructor(private formBuilder:FormBuilder, private miCuenta:MiCuentaService) {
    this.form=this.formBuilder.group({
      nombre:['',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      apellido:['',[Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      telefono:['',[Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      direccion: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-zA-Z]).{3,}$')]],
      ciudad: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      provincia: ['', Validators.required],
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
      alert("Guardando en el servidor...")
    }
    this.form.markAllAsTouched()
  }
}
