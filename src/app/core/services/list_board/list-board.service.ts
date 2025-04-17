import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListBoardCreate } from '../../models/list_board/list_board_create';
import { ListOrder } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class ListBoardService {
  url: string = `${environment.apiUrl}ListBoard`;

  constructor(private htttClient: HttpClient) { }

  createListBoard(listBoard: ListBoardCreate): Observable<any> {
    return this.htttClient.post(`${this.url}/Create`, listBoard);
  }

  updateListBoardOrder(listOrder: ListOrder): Observable<any> {
    return this.htttClient.put(`${this.url}/UpdateOrder/${listOrder.id}`, listOrder.order);
  }
}
