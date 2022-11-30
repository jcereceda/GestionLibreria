import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Componentes
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';

// Rutas dentro de la aplicacion por los distintos componentes
const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full'}, // La página por defecto será el listado de libros
  { path: 'tutorials', component: TutorialsListComponent},
  { path: 'tutorials/:id', component: TutorialDetailsComponent},
  { path: 'add', component: AddTutorialComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
