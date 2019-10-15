import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  nameChange = new EventEmitter<string>()
  imageChange = new EventEmitter<string>();
  user: User;
  url: string = `https://conduit.productionready.io/api/user`;
  userUrl: string = 'https://conduit.productionready.io/api/profiles';
  public httpHeader = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Accept': `application/json`,
      'Content-Type': `application/json;charset=UTF-8`,
    })
  private follow:string;

  //Update lại header mỗi khi có sự đăng nhập/đăng xuất xảy ra
  constructor(private httpClient: HttpClient, private authService: AuthService) { 
    this.authService.isLoggin
      .subscribe((status) => {
        if (status) {
          this.httpHeader = new HttpHeaders({
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Accept': `application/json`,
            'Content-Type': `application/json;charset=UTF-8`,
          })
        }
      })
  }

  updateProFile(pictureUrl: string, username: string, bio: string, email: string, password: string): Observable<User> {
    localStorage.setItem('password', password);
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

  getUserDetail(userName: string): Observable<Profile>{
    return localStorage.getItem('token') ? this.httpClient.get<Profile>(`${this.userUrl}/${userName}`, {headers:this.httpHeader}) : this.httpClient.get<Profile>(`${this.userUrl}/${userName}`);
  }

  followUser(userName: string): Observable<Profile>{
    return this.httpClient.post<Profile>(`${this.userUrl}/${userName}/follow`,{
       withCredentials: true
    },{headers:this.httpHeader},
    );
  }

  unfollowUser(userName: string): Observable<Profile>{
    return this.httpClient.delete<Profile>(`${this.userUrl}/${userName}/follow`, {headers:this.httpHeader});
  }

}
