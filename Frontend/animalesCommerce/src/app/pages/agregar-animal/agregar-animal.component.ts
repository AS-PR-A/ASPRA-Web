import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListaAdopcionService } from 'src/app/services/lista-adopcion.service';


@Component({
  selector: 'app-agregar-animal',
  templateUrl: './agregar-animal.component.html',
  styleUrls: ['./agregar-animal.component.css'],
})
export class AgregarAnimalComponent {
  form;
  tipos: string[] = ['Perro', 'Gato', 'Otro'];
  constructor(
    private formBuilder: FormBuilder,
    private listAdop: ListaAdopcionService,
  ) {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      tipo: ['', Validators.required],
      fecha_ingreso: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      id_refufio: 1,
      id_tipo: 2,
      img: '',
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }
  get descripcion() {
    return this.form.get('descripcion');
  }
  get fecha() {
    return this.form.get('fecha_ingreso');
  }
  get img() {
    return this.form.get('img');
  }

  onEnviar(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      console.log(this.form.value);
      const formData = this.form.value;
      this.listAdop.agregar(formData).subscribe({
        next: () => {
          alert('Se agregó el animal correctamente!');
        },
        error: (error) => {
          console.error('Error al agregar el animal:', error);
          alert('Ocurrió un error al agregar el animal. Por favor, inténtalo de nuevo.');
        }
      });
    }
    this.form.markAllAsTouched();
  }
  

}
