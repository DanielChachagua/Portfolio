import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { Project, ProjectCreate, ProjectResponse, ProjectUpdate } from '../../models/project/project';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url: string = `${environment.apiUrl}project`;

  private projectSubject = new BehaviorSubject<ProjectResponse[]>([]);
  project$ = this.projectSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  createProject(project: ProjectCreate) {
    return this.httpClient.post(`${this.url}/create`, project);
  }

  getFavoritesProjects() {
    return this.httpClient.get<ProjectResponse[]>(`${this.url}/getFavorites`).pipe(
      tap((boards: any) => this.projectSubject.next(boards.body)),
      catchError((error) => {
        console.error('Error al obtener los projectos:', error);
        return of([]);
      })
    );
  }
 
  getAllProjects() {
    return this.httpClient.get<ProjectResponse[]>(`${this.url}/getAll`).pipe(
      tap((boards: any) => this.projectSubject.next(boards.body)),
      catchError((error) => {
        console.error('Error al obtener los projectos:', error);
        return of([]);
      })
    );
  }

  getProjectById(id: string) {
    return this.httpClient.get<ProjectResponse>(`${this.url}/get/${id}`).pipe(
      tap((boards: any) => this.projectSubject.next(boards.body)),
      catchError((error) => {
        console.error('Error al obtener los projectos:', error);
        return of([]);
      })
    );
  }

  updateProject(id: string, project: ProjectUpdate) {
    return this.httpClient.put(`${this.url}/update/${id}`, project);
  }

  deleteProject(id: string) {
    return this.httpClient.delete(`${this.url}/delete/${id}`);
  }

}
