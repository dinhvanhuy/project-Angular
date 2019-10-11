import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggin: boolean = false;
  token: string;
  loginUrl = `https://conduit.productionready.io/api/users/login`;
  signupUrl = `https://conduit.productionready.io/api/users`

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<User>  {
    // console.log(email, password);
    return this.httpClient.post<User>(this.loginUrl, {
      'user': {
        'email': email,
        'password': password 
      }
    })
  }

  signup(name: string, email: string, password: string): Observable<User> {
    return this.httpClient.post<User>(this.signupUrl, {
      'user': {
        'username': name,
        'email': email,
        'password': password
      }
    })
  }
}
