import { Injectable } from '@angular/core';
import { BoardCreate } from '../../models/board/boardCreate';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../../auth/token/token.service';
import { Board } from '../../models/board/board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  url: string = `${environment.apiUrl}Board`;

  private boardsSubject = new BehaviorSubject<Board[]>([]);
  boards$ = this.boardsSubject.asObservable();

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  createBoard(board: BoardCreate): Observable<any>{
    return this.httpClient.post(`${this.url}/create`, board);
  }

  // getBoardsUser(){
  //   this.httpClient.get(`${this.url}/getBoardsUser`).subscribe({
  //     next: (result: any) => {
  //       this.boardsSubject.next(result.body);
  //     }
  //   });
  // }
  getBoard(id: string): Observable<any>{
    return this.httpClient.get(`${this.url}/getBoard/${id}`);
  }

  getBoardsUser(): Observable<Board[]> {
    // this.boardsSubject.next([]);
    return this.httpClient.get<Board[]>(`${this.url}/getBoardsUser`).pipe(
      tap((boards: any) => this.boardsSubject.next(boards.body)),
      catchError((error) => {
        console.error('Error al obtener los tableros del usuario:', error);
        return of([]); // Devuelve un observable vacío para evitar romper el flujo.
      })
    );
  }

  getFavoriteBoards(){
    // this.boardsSubject.next([]);
    return this.httpClient.get<Board[]>(`${this.url}/getFavoriteBoards`).pipe(
      tap((boards: any) => this.boardsSubject.next(boards.body)),
      catchError((error) => {
        console.error('Error al obtener los tableros del usuario:', error);
        return of([]); // Devuelve un observable vacío para evitar romper el flujo.
      })
    );
  }

  getBoardsMember(){
    // this.boardsSubject.next([]);
    return this.httpClient.get<Board[]>(`${this.url}/getBoardsMember`).pipe(
      tap((boards: any) => this.boardsSubject.next(boards.body)),
      catchError((error) => {
        console.error('Error al obtener los tableros del usuario:', error);
        return of([]); // Devuelve un observable vacío para evitar romper el flujo.
      })
    );
  }

  toggleFavorite(id: string){
    return this.httpClient.put(`${this.url}/toggleFavorite/${id}`, null);
  }

  fetchBoardsBySegment(segment: string): Observable<Board[]> {
    switch (segment) {
      case 'boards':
        return this.getBoardsUser();
      case 'favorites':
        return this.getFavoriteBoards();
      case '':
        return this.getBoardsMember();
      default:
        console.warn(`Segmento no reconocido: ${segment}`);
        this.boardsSubject.next([]);
        return of([]);
    }
  }
  

  // createBoard(board: BoardCreate): Observable<any>{
  //   return this.httpClient.post(`${this.url}/create`, board);
  // }

  // getBoardsUser(): Observable<any>{
  //   return this.httpClient.get(`${this.url}/getBoardsUser`);
  // }

  // getBoard(id: string): Observable<any>{
  //   return this.httpClient.get(`${this.url}/getBoard/${id}`);
  // }

  // getFavoriteBoards(){
  //   return this.httpClient.get(`${this.url}/getFavoriteBoards`)
  // }

  // getBoardsMember(){
  //   return this.httpClient.get(`${this.url}/getBoardsMember`)
  // }


}
