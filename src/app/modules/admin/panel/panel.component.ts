import { Component } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { BoardDTO } from '../../../core/models/board/boardDTO';
import { CardListComponent } from './card-list/card-list.component';
import { SignalRService } from '../../../core/services/signalR/signal-r.service';
import { ListBoardDTO } from '../../../core/models/list_board/list_boardDTO';
import { Subscription } from 'rxjs';
import { UserMember } from '../../../core/models/user/user_member';
import { ListBoardService } from '../../../core/services/list_board/list-board.service';
import {CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-panel',
  imports: [CommonModule ,SidenavComponent, CardListComponent,CdkDropList],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  board: BoardDTO | null= null;
  listBoard: ListBoardDTO[] | null= [];
  usersMembers: UserMember[] | null = [];
  private subscriptions: Subscription = new Subscription();
  connectedDropLists: string[] = [];

  constructor(
    private signalR: SignalRService,
    private listBoardService: ListBoardService,
  ) {
    this.subscriptions.add(
      this.signalR.usersMembers$.subscribe(response => {
        this.usersMembers = response;
      })
    );

    this.subscriptions.add(
      this.signalR.board$.subscribe(response => {
        this.board = response;
      })
    );

    this.subscriptions.add(
      this.signalR.listBoard$.subscribe(response => {
        this.listBoard = response;
      })
    );

  }
  
  async ngOnInit() {

  }

  async ngOnDestroy() {
    this.subscriptions.unsubscribe();

    await this.signalR.closeConnection();
  }
  
  createlist(){
    this.listBoardService.createListBoard({name: `Board ${this.listBoard?.length}`, boardId: this.board?.id!, order: this.listBoard?.length!}).subscribe({
      next: (response) => {
        console.log("response: ", response);
      }
    });
  }

  drop(event: CdkDragDrop<ListBoardDTO[]>) {
    moveItemInArray(this.listBoard!, event.previousIndex, event.currentIndex);

    if(this.listBoard!.length > 1){
      const order = this.listBoard!.map((list, index) => ({id: list.id, order: index}));
      this.listBoardService.updateListBoardOrder({id: this.board!.id, order: order}).subscribe({
        next: (response) => {
          console.log("response: ", response);
        }
      });
    }
  }

}
