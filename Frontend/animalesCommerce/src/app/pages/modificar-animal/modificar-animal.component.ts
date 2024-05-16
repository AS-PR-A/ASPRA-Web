import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaAdopcionService } from 'src/app/services/lista-adopcion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-animal',
  templateUrl: './modificar-animal.component.html',
  styleUrls: ['./modificar-animal.component.css']
})
export class ModificarAnimalComponent implements OnInit {
  animalId!: number;
  animal: any;
  animalForm!: FormGroup;
  datosFormulario: any = {};

  constructor(
    private route: ActivatedRoute,
    private listaAdopcionService: ListaAdopcionService,
    private formBuilder: FormBuilder,
    private router:Router
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
        this.animal = listaAnimales.find((animal: any) => animal.id === this.animalId);
        if (!this.animal) {
          console.error('No se encontró el animal con el ID proporcionado.');
        } else {
          this.inicializarFormulario();
        }
      },
      error: (error) => {
        console.error('Error al obtener la lista de animales:', error);
      }
    });
  }
  
  inicializarFormulario(): void {
    this.animalForm = this.formBuilder.group({
      nombre: [this.animal.nombre || '', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      descripcion: [this.animal.descripcion || '', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      tipo: [this.animal.tipo || '', Validators.required],
      fecha_ingreso: [this.animal.fecha_ingreso || '', Validators.required],
      img: [this.animal.img || '']
    });
  }

  onSubmit(event:Event): void {
    event.preventDefault();
    if (this.animalForm.valid) {
      this.datosFormulario.nombre = this.animalForm.get('nombre')?.value;
      this.datosFormulario.descripcion = this.animalForm.get('descripcion')?.value;
      this.datosFormulario.tipo = this.animalForm.get('tipo')?.value;
      this.datosFormulario.fecha_ingreso = this.animalForm.get('fecha_ingreso')?.value;
      this.datosFormulario.img = this.animalForm.get('img')?.value;
      console.log(this.datosFormulario.value);
      this.listaAdopcionService.modificarAnimal(this.animalId, this.datosFormulario).subscribe({
        next: () => {
          alert('Se modificó el animal correctamente!');
          this.router.navigate(['/listaAdopcion/'])
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
