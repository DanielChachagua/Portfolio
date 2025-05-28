import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Skill, SkillCreate } from '../../models/skill/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  url: string = `${environment.apiUrl}skill`;

  private skillSubject = new BehaviorSubject<Skill[]>([]);
  skills$ = this.skillSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  createSkill(skill: FormData) {
    return this.httpClient.post(`${this.url}/create`, skill);
  }

  getAllSkills() {
    return this.httpClient.get<Skill[]>(`${this.url}/getAll`).pipe(
      tap((skills: any) => this.skillSubject.next(skills.body)),
      catchError((error) => {
        console.error('Error al obtener los projectos:', error);
        return of([]);
      })
    );
  }

  updateSkill(id: string, skill: FormData) {
    return this.httpClient.put(`${this.url}/update/${id}`, skill);
  }

  deleteSkill(id: string) {
    return this.httpClient.delete(`${this.url}/delete/${id}`);
  }
}
