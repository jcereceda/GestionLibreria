import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

// URL de la api donde se encontrarán los datos de la Base de datos

const baseUrl = 'http://localhost:8080/api/tutorials'

@Injectable({
  providedIn: 'root'
})

export class TutorialService {

  // Cliente Http para mandar peticiones al servidor
  constructor(private http: HttpClient) { }

  // Funcion para recuperar todos los libros de la api
  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(baseUrl);
  }

  // Funcion para recuperar Un libro de la api por ID
  get(id: any): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${baseUrl}/${id}`);
  }

  // Funcion para enviar un nuevo libro a la api y que quede registrado
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // Funcion para actualizar un libro en concreto (id) con unos nuevos datos (data)
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`,data);
  }

  // Eliminar un libro en concreto por id
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }


// Funcion para eliminar todos los libros
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  // Funcion para buscar y devolver un libro por su titulo
  findByTitle(titulo: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?titulo=${titulo}`);
  }
}
