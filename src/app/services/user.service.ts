import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  url: string = `https://conduit.productionready.io/api/user`;
  
  constructor(private httpClient: HttpClient) { }

  updateProFile(pictureUrl: string, username: string, bio: string, email: string, password: string): Observable<User> {
    const httpHeader = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Accept': `application/json`,
      'Content-Type': `application/json;charset=UTF-8`
    })
    return this.httpClient.put<User>(this.url, {
      'user': {
        'email': email,
        'username': username,
        'image': pictureUrl,
        'password': password,
        'bio': bio
      }
    }, {
      headers: httpHeader
    })
  }
}
