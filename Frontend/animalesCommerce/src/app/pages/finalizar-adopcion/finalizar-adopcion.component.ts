import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-finalizar-adopcion',
  templateUrl: './finalizar-adopcion.component.html',
  styleUrls: ['./finalizar-adopcion.component.css']
})
export class FinalizarAdopcionComponent {
  
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      horario: ['', Validators.required],
      nombre: ['', Validators.required]
    });
  }

  get horario() {
    return this.form.get('horario');
  }

  get nombre() {
    return this.form.get('nombre');
  }

  submitForm(event: Event) {
    event.preventDefault();
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // Aquí puedes realizar alguna acción, como enviar los datos a un servidor
      alert('¡Adopción exitosa!');
    }
  }
}