import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  url: string = `https://conduit.productionready.io/api/user`;
  userUrl: string = 'https://conduit.productionready.io/api/profiles';

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
  //Tôi không hiểu sao dùng httpHeader lại không được nên tôi dùng cái viết bình thường này cho nó chạy được đã nhé
  getUserDetail(userName: string): Observable<Profile>{
    return this.httpClient.get<Profile>(`${this.userUrl}/${userName}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Accept': `application/json`,
        'Content-Type': `application/json;charset=UTF-8`
      }
    });
  }

  followUser(userName: string): Observable<Profile>{
    return this.httpClient.get<Profile>(`${this.userUrl}/${userName}/follow`,  {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Accept': `application/json`,
        'Content-Type': `application/json;charset=UTF-8`
      }
    });
  }

  unfollowUser(userName: string): Observable<Profile>{
    return this.httpClient.delete<Profile>(`${this.userUrl}/${userName}/follow`,  {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Accept': `application/json`,
        'Content-Type': `application/json;charset=UTF-8`
      }
    });
  }
}
