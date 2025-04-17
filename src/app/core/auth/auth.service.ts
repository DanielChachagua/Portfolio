import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {

  }

  // auth(email: string, password: string): Observable<any>{
  //   return this.httpClient.post(environment.apiUrl+'User/Login', login_model);
  auth(email: string, password: string): Observable<HttpResponse<any>> {
    let login_model: { email: string, password: string } = { email: email, password: password };
    return this.httpClient.post(environment.apiUrl + 'User/Login', login_model
      , {
        observe: 'response'
      }).pipe(
        tap((response) => {
          console.log(response);
          const token = response.headers.get('x-access-token');
          this.userService.saveToken(token ?? '');
          // this.userService.saveToken(body.token);
        })
      );
  }

}
