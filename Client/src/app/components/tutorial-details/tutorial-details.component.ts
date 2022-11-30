import { Component, Input, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service'; // Para las funciones a realizar
import { Tutorial } from 'src/app/models/tutorial.model'; // modelo de libro
// COntrolar las rutas especificas
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
// Recuperar valores
  @Input() viewMode = false;
  // Instanciar el tutorial seleccionado (por defecto uno vacío)
  @Input() currentTutorial: Tutorial = {
    isbn: '',
    titulo: '',
    autor: '',
    numPags: 0,
    precio:0
  }

  message = '';
  // Instanciamos el servicio para realizar las funciones y las rutas ya que desde esta vista navegaremos si eliminamos
  constructor(private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router) {

   }

  ngOnInit(): void {
    if(!this.viewMode){
      this.message = '';
      // Capturar el id
      this.getTutorial(this.route.snapshot.params['id']);
    }
  }

  // Recuperar el Libro seleccionado en la lista
  getTutorial(id: string): void{
    this.tutorialService.get(id)
      .subscribe({
        next: (data) => {
          this.currentTutorial = data;
          console.log(data);
        },
      error: (err) => console.log(err)
    });
  }

  // Se usaría para modificar algun atributo pasandoselo por parametro
  /*
  cambiarPrecio(nuevoPrecio: number): void {
    const data = {
      isbn: this.currentTutorial.isbn,
      titulo: this.currentTutorial.titulo,
      autor: this.currentTutorial.autor,
      numPags: this.currentTutorial.numPags,
      precio: nuevoPrecio
    };

    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentTutorial.precio = nuevoPrecio;
          this.message = res.message ? res.message: "el precio del libro se ha modificado satisfactoriamente"
        },
        error: (e) => console.log(e)
      })
  }
*/

// Método que se llama al actualizar un libro
  updateTutorial(): void{
    this.message = '';
    // ID para que sea ese en concreto + el libro con los nuevos datos
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message: "el libro se ha modificado satisfactoriamente"
        },
        error: (e) => console.log(e)
      })
  }

  // Funcion para eliminar un libro en concreto
  // De parámetro el id del libro seleccionado
  deleteTutorial(){
    this.message = '';
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          // Redirigimos al listado de nuevo
          this.router.navigate(['/tutorials']);
        },
        error: (e) => console.log(e)
      });
  }
}
