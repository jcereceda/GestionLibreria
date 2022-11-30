import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({

  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  titulo = '';

  // Instanciar el servicio para realizar las tareas
  constructor(private tutorialService: TutorialService) { }


  ngOnInit(): void {
    this.retrieveTutorials();
  }

  // Funcion para recuperar todos los libros
  retrieveTutorials(): void{
    this.tutorialService.getAll()
    .subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    })
  }

  // funcion para Actualizar lista llamando al método y desseleccionando libro
  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  //funcion para Destacar el libro seleccionado
  setActiveTutorial(tutorial: Tutorial, index: number): void{
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  // Funcion para Eliminar todos los libros
  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe({
        next:(res) =>{
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.log(e)
      });
  }

  // Funcion para buscar un libro por su titulo
  searchTitle(){
    this.currentTutorial = {};
    this.currentIndex = -1;

    this.tutorialService.findByTitle(this.titulo)
      .subscribe({
        next:(data) =>{
          this.tutorials = data;
          console.log(data);
        },
        error: (e) => console.log(e)
      });
  }
}
