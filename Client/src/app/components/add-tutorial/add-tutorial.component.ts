import { Component, OnInit } from '@angular/core';
// importar modelo con la que recuperrar inf
import { Tutorial } from 'src/app/models/tutorial.model'
// Servicio donde nos conectaremos para enviar la inf
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {
  // Instanciamos objeto
  tutorial: Tutorial = {
    isbn: '',
    titulo: '',
    autor: '',
    precio: 0,
    numPags: 0
  };
  submitted = false;

  // Instanciamos el servicio con el que se harán las operaciones
  constructor(private tutorialService: TutorialService) {  }
  ngOnInit(): void {

  }

  // Funcion para guardar un nuevo Libro
  saveTutorial(): void{
    // Recuperar inf
    const data = {
      isbn: this.tutorial.isbn,
      titulo: this.tutorial.titulo,
      autor: this.tutorial.autor,
      precio: this.tutorial.precio,
      numPags: this.tutorial.numPags
    };

    this.tutorialService.create(data) // enviar inf
    // Saber si se ha enviado o recibido
    .subscribe({
      next: (res)=>{
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.log(e)
    });
  }

  // Agregar nuevo libro
  newTutorial(): void{
    this.submitted = false;
    // Limpiamos el objeto
    this.tutorial = {
      isbn: '',
      titulo: '',
      autor: '',
      precio: 0,
      numPags: 0
    };

  }
}
