import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CardCreate } from '../../models/card/card_create';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BoardIdListOrder, ListOrder } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  url: string = `${environment.apiUrl}Card`;

  constructor(private httpClient: HttpClient) { }

  createCard(cardCreate: CardCreate): Observable<any> {
    return this.httpClient.post(`${this.url}/CreateCard`, cardCreate);
  }

  getCardBoard(boardId: string, ): Observable<any> {
    return this.httpClient.get(`${this.url}/GetCardBoard/${boardId}`);
  }

  updateCardOrderList(boardIdOrder: BoardIdListOrder): Observable<any> {
    console.log("boardIdOrder: ", boardIdOrder);
    return this.httpClient.put(`${this.url}/UpdateCardOrderList/${boardIdOrder.id}`, boardIdOrder.order);
  }

  UpdateCardOrderOtherList(boardId: string, listIdOrder: ListOrder[]): Observable<any> {
    return this.httpClient.put(`${this.url}/UpdateCardOrderOtherList/${boardId}`, listIdOrder);
  }
}
