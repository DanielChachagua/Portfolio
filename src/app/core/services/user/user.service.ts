import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../../auth/token/token.service';
import { jwtDecode } from 'jwt-decode';
import { UserToken } from '../../models/user/userToken';
import { UserDTO } from '../../models/user/userDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = `${environment.apiUrl}user`

  // private userSubject = new BehaviorSubject<UserToken>({});
  private userSubject = new BehaviorSubject<UserToken | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
    if (this.tokenService.existToken()) {
      this.decodingJWT();
    }
  }

  validUserName(userName: string): Observable<any> {
    return this.httpClient.get(`${this.url}/validUsername/${userName}`);
  }

  validEmail(email: string): Observable<any> {
    return this.httpClient.get(`${this.url}/validEmail/${email}`);
  }

  private decodingJWT() {
    const token = this.tokenService.getToken();
    const decode = jwtDecode(token!) as any;
    console.log("🚀 ~ UserService ~ decodingJWT ~ decode:", decode)
    let user: UserToken = {
      id: decode.Id,
      // email: decode.Email,
      // firstName: decode.FirstName,
      // lastName: decode.LastName
    }
    this.userSubject.next(user);
  }

  getUserSubject() {
    return this.userSubject.asObservable();
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodingJWT();
  }

  deleteToken() {
    this.tokenService.deleteToken();
    this.userSubject.next(null);
  }

  isLogin() {
    return this.tokenService.existToken();
  }

  getUser(): Observable<{ body: UserDTO }> {
    return this.httpClient.get<{ body: UserDTO }>(`${this.url}/get`);
  }
}


