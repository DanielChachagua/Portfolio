import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../../auth/token/token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { BoardDTO } from '../../models/board/boardDTO';
import { ListBoardDTO } from '../../models/list_board/list_boardDTO';
import { UserMember } from '../../models/user/user_member';
import { Order } from '../../models/order';
import { CardDTO } from '../../models/card/cardDTO';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connection!: signalR.HubConnection;
  private isConnectionInitialized = false;

  private usersMembersSubject = new BehaviorSubject<UserMember[] | null>(null);
  public usersMembers$: Observable<UserMember[] | null> = this.usersMembersSubject.asObservable();

  private boardSubject = new BehaviorSubject<BoardDTO | null>(null);
  public board$: Observable<BoardDTO | null> = this.boardSubject.asObservable();

  private listBoardSubject = new BehaviorSubject<ListBoardDTO[] | null>(null);
  public listBoard$: Observable<ListBoardDTO[] | null> = this.listBoardSubject.asObservable();

  private cardsSubject = new BehaviorSubject<CardDTO[] | null>(null);
  public cards$: Observable<CardDTO[] | null> = this.cardsSubject.asObservable();

  constructor(private tokenService: TokenService) { }

  public async initializeConnection(): Promise<void> {
    if (this.isConnectionInitialized) return;

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.serverUrl}/kanbanHub`, {
        accessTokenFactory: () => {
          const token = this.tokenService.getToken();
          const tokenBearer = token.replace("Bearer ", "").trim();
          return tokenBearer;
        }
      })
      .withAutomaticReconnect()
      .build();

    try {
      await this.connection.start();
      console.log('Conexión establecida con SignalR');
      this.isConnectionInitialized = true;

      this.connection.on('GetMembersBoard', (response: any) => {
        console.log("response: ", response);
        console.log(response.message);
        if (response.status) {
          this.usersMembersSubject.next(response.body);
        }
      });

      this.connection.on('GetBoard', (response: any) => {
        console.log("response: ", response);
        console.log(response.message);
        if (response.status) {
          this.boardSubject.next(response.body);
        }
      });

      this.connection.on('GetListBoardByBoard', (response: any) => {
        console.log("response: ", response);
        console.log(response.message);
        if (response.status) {
          this.listBoardSubject.next(response.body);
        }
      });

      this.connection.on('GetCardBoard', (response: any) => {
        console.log("response: ", response);
        console.log(response.message);
        if (response.status) {
          this.cardsSubject.next(response.body);
        }
      });

      this.connection.on('NewListBoard', (response: any) => {
        if (response.status) {
          const currentList = this.listBoardSubject.value;
          if (currentList != null) {
            this.listBoardSubject.next([...currentList, response.body]);
          } else {
            this.listBoardSubject.next(response.body);
          }
        }
      });

      this.connection.on('UpdateOrderListBoards', (response: any) => {
        if (response.status) {
          const currentList = this.listBoardSubject.value;
      
          if (currentList) {
            const orderMap = new Map<string, number>(
              response.body.map((listOrder: Order) => [listOrder.id, listOrder.order])
            );
      
            const updatedList = currentList.map((list) => {
              const newOrder = orderMap.get(list.id);
              list.order = newOrder !== undefined ? newOrder : list.order;
              return list;
            });
      
            this.listBoardSubject.next([...updatedList.sort((a, b) => a.order - b.order)]);
          }
        }
      });
      
      this.connection.on('UpdateCardOrderList', (response: any) => {
        if (response.status) {
          const currentList = this.listBoardSubject.value;
        
          if (currentList) {
            const orderMap = new Map<string, number>(
              response.body.newOrders.map((listOrder: Order) => [listOrder.id, listOrder.order])
            );
        
            const listBoardIndex = currentList.findIndex((list) => list.id === response.body.listBoardId);
        
            if (listBoardIndex !== -1) {
              const updatedListBoard = {
                ...currentList[listBoardIndex],
                cards: currentList[listBoardIndex].cards?.map((card) => {
                  const newOrder = orderMap.get(card.id);
                  return {
                    ...card,
                    order: newOrder !== undefined ? newOrder : card.order,
                  };
                }),
              };
              updatedListBoard.cards = updatedListBoard.cards?.sort((a, b) => a.order - b.order);
        
              const updatedList = [...currentList];
              updatedList[listBoardIndex] = updatedListBoard;
        
              this.listBoardSubject.next([...updatedList.sort((a, b) => a.order - b.order)]);
            }
          }
        }
      });

      this.connection.on('UpdateCardOrderListOther', (response: any) => {
        console.log(response);
        if (response.status) {
          const currentList = this.listBoardSubject.value;
        
          if (currentList) {
            for(var listBoard of (response.body) as ListBoardDTO[]) {
              const listBoardIndex = currentList.findIndex((list) => list.id === listBoard.id);

              if (listBoardIndex !== -1) {
                currentList[listBoardIndex] = listBoard;
              }
            }
            this.listBoardSubject.next([...currentList.sort((a, b) => a.order - b.order)]);
          }
        }
      });

    } catch (err) {
      console.error('Error al conectar con SignalR', err);
      throw err;
    }
  }

  public async closeConnection(): Promise<void> {
    if (this.connection && this.isConnectionInitialized) {
      try {
        await this.connection.stop();
        console.log('Conexión con SignalR cerrada');
        this.usersMembersSubject.next(null);
        this.boardSubject.next(null);
        this.listBoardSubject.next(null);
        this.isConnectionInitialized = false;
      } catch (err) {
        console.error('Error al cerrar la conexión con SignalR', err);
      }
    }
  }

  public async invokeServerMethod(methodName: string, ...args: any[]): Promise<void> {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      try {
        await this.connection.invoke(methodName, ...args);
      } catch (err) {
        console.error(`Error al invocar ${methodName}`, err);
        throw err;
      }
    } else {
      console.error('Conexión no activa. No se puede invocar el método.');
      throw new Error('Conexión no activa. No se puede invocar el método.');
    }
  }

  public onEvent(eventName: string, callback: (...args: any[]) => void): void {
    if (this.connection) {
      this.connection.on(eventName, callback);
    } else {
      console.error('Conexión no inicializada. No se puede escuchar el evento.');
    }
  }
}
