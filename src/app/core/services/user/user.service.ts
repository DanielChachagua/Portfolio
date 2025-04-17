import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../../models/user/register';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../../auth/token/token.service';
import { jwtDecode } from 'jwt-decode';
import { UserToken } from '../../models/user/userToken';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = `${environment.apiUrl}User`

  private userSubject = new BehaviorSubject<UserToken>({});

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { 
    if(this.tokenService.existToken()){
      this.decodingJWT();
    }
  }

  registerUser(user: Register): Observable<any>{
    return this.httpClient.post(`${this.url}/register`, user);
  }

  validUserName(userName: string): Observable<any>{
    return this.httpClient.get(`${this.url}/validUsername/${userName}`);
  }

  validEmail(email: string): Observable<any>{
    return this.httpClient.get(`${this.url}/validEmail/${email}`);
  }

  private decodingJWT(){
    const token = this.tokenService.getToken();
    const decode = jwtDecode(token!) as any;
    let user: UserToken = {
      id: decode.Id,
      email: decode.Email,
      firstName: decode.FirstName,
      lastName: decode.LastName
    }
    this.userSubject.next(user);
  }

  getUserSubject(){
    return this.userSubject.asObservable();
  }

  saveToken(token: string){
    this.tokenService.saveToken(token);
    this.decodingJWT();
  }

  deleteToken(){
    this.tokenService.deleteToken();
    this.userSubject.next({});
  }

  isLogin(){
    return this.tokenService.existToken();
  }
}


