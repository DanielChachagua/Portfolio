import { Component, Input, ViewChild } from '@angular/core';
import { Board } from '../../../../core/models/board/board';
import { BoardService } from '../../../../core/services/board/board.service';
import { BoardComponent } from '../board.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-board',
  imports: [RouterModule],
  templateUrl: './card-board.component.html',
  styleUrl: './card-board.component.css'
})
export class CardBoardComponent {
  @Input() board!: Board; 
  @Input() initBoard!: () => void; 

  constructor(
    private boardService: BoardService,
  ){
  }

  async toggleFavorite(id: string){
    this.boardService.toggleFavorite(id).subscribe({
      next: (result) => {
        this.initBoard();
      },
      error: (er) => {
        console.log(er)
      }
    })
  }
}
