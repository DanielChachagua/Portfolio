import { afterNextRender, Component, Input } from '@angular/core';
import { ListBoardDTO } from '../../../../core/models/list_board/list_boardDTO';
import { CardCardComponent } from './card-card/card-card.component';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CardService } from '../../../../core/services/card/card.service';
import { CardCreate } from '../../../../core/models/card/card_create';
import { CommonModule } from '@angular/common';
import { CardDTO } from '../../../../core/models/card/cardDTO';

@Component({
  selector: 'app-card-list',
  imports: [CardCardComponent, CdkDrag, CdkDragHandle, CommonModule, CdkDropList],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  @Input() listBoard!: ListBoardDTO;
  @Input() connectedDropLists: string[] = [];

  constructor(
    private cardService: CardService
  ) {
  }

  ngOnInit() {
    this.connectedDropLists.push(this.listBoard.id);
  }

  createCard() {
    const card: CardCreate = {
      title: `New Card ${this.listBoard.cards?.length ?? 0}`,
      listBoardId: this.listBoard.id,
      order: this.listBoard.cards?.length ?? 0,
      boardId: this.listBoard.boardId
    };

    console.log("card: ", card);


    this.cardService.createCard(card).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  dropCard(event: CdkDragDrop<CardDTO[]>) {
    console.log(event.previousContainer);
    console.log(event.container);
    if (event.previousContainer === event.container) {
      if (this.listBoard.cards!.length > 1) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        const order = this.listBoard.cards!.map((card, index) => ({ id: card.id, order: index }));
        console.log({ id: this.listBoard!.boardId, order: { id: this.listBoard!.id, order: order } });
        this.cardService.updateCardOrderList(
          { id: this.listBoard!.boardId, order: { id: this.listBoard!.id, order: order } }
        ).subscribe({
          next: (response) => {
            console.log("response: ", response);
          }
        });
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const idPrev = event.previousContainer.id;
      const idCurr = event.container.id;
      const orderPrev = event.previousContainer.data.map((card, index) => ({ id: card.id, order: index }));
      const orderCurr = event.container.data.map((card, index) => ({ id: card.id, order: index }));

      this.cardService.UpdateCardOrderOtherList(
        this.listBoard.boardId,
        [{ id: idPrev, order: orderPrev }, { id: idCurr, order: orderCurr }]
      ).subscribe({
        next: (response) => {
          console.log(response);
        }
      });
    }

  }

}
