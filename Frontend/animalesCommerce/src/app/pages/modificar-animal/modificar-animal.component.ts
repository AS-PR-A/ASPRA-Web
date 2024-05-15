import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaAdopcionService } from 'src/app/services/lista-adopcion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modificar-animal',
  templateUrl: './modificar-animal.component.html',
  styleUrls: ['./modificar-animal.component.css']
})
export class ModificarAnimalComponent implements OnInit {
  animalId!: number;
  animalForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private listaAdopcionService: ListaAdopcionService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.animalId = +id;
      this.obtenerDatosAnimal();
    } else {
      console.error('No se proporcionó ningún ID de animal.');
    }
  }
  
  obtenerDatosAnimal(): void {
    this.listaAdopcionService.verListaAdopcion().subscribe({
      next: (listaAnimales) => {
        const animal = listaAnimales.find((animal: any) => animal.id === this.animalId);
        if (!animal) {
          console.error('No se encontró el animal con el ID proporcionado.');
        } else {
          this.inicializarFormulario(animal);
        }
      },
      error: (error) => {
        console.error('Error al obtener la lista de animales:', error);
      }
    });
  }
  
  inicializarFormulario(animal: any): void {
    this.animalForm = this.formBuilder.group({
      nombre: [animal.nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      descripcion: [animal.descripcion, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      tipo: [animal.tipo, Validators.required],
      fecha_ingreso: [animal.fecha_ingreso, Validators.required],
      img: [animal.img || '']
    });
  }

  onSubmit(): void {
    if (this.animalForm.valid) {
      const formData = this.animalForm.value;
      console.log(formData);
      this.listaAdopcionService.modificarAnimal(this.animalId, formData).subscribe({
        next: () => {
          alert('Se modificó el animal correctamente!');
        },
        error: (error) => {
          console.error('Error al modificar el animal:', error);
          alert('Ocurrió un error al modificar el animal. Por favor, inténtalo de nuevo.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }
}