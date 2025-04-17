import { Component } from '@angular/core';
import { BoardService } from '../../../core/services/board/board.service';
import { Board } from '../../../core/models/board/board';
import { CardBoardComponent } from './card-board/card-board.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CardBoardComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
// export class BoardComponent {
  // boards: Board[] = [];
  // boards$: Observable<Board[]>;

  // constructor(
  //   private boardService: BoardService
  // ){
  //   this.boards$ = this.boardService.boards$;
  //   // this.boardService.getBoardsUser().subscribe({
  //   //   next: (response) => {
  //   //     console.log('boards exitoso:', response);
  //   //     // this.router.navigate(['login']);
  //   //     this.boards = [...response.body];
  //   //   },
  //   //   error: (error) => {
  //   //     console.error('Error al registrarse:', error);
  //   //   },
  //   //   complete: () => {
  //   //     console.log('Operación completada');
  //   //   }
  //   // });
  //   // this.boardService.getBoardsUser();
    
  // }
  
  // ngOnInit() {
  //   this.boardService.getBoardsUser().subscribe({
  //     next: (result) => console.log(result),
  //     error: (error) => console.error('Error al cargar los tableros:', error),
  //   });
  // }
  export class BoardComponent {
  boards$: Observable<Board[]>;
  private destroy$ = new Subject<void>();
  errorBoard: boolean = false;
  currentSegment: string = '';

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute
  ) {
    this.boards$ = this.boardService.boards$;
  }

  ngOnInit() {
    this.initBoard();
  }

  initBoard(){
    this.route.url.subscribe(urlSegments => {
      this.currentSegment = urlSegments.map(segment => segment.path).join('/');
      this.boardService.fetchBoardsBySegment(this.currentSegment).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        error: (error) => {
          console.error('Error al cargar los tableros:', error);
          this.errorBoard = true;
        },
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
