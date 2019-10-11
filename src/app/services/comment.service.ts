import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comment';
import { Comments } from '../models/comments';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public url = 'https://conduit.productionready.io/api/articles';
  public httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      })
    }

  constructor(private http: HttpClient, private userService: UserService) {
   }

  getComment(slug: string): Observable<Comments> {
	  return this.http.get<Comments>(`${this.url}/${slug}/comments`, this.httpOptions);
  }

  addComment(slug: string, data: object): Observable<Comment>{
  	return this.http.post<Comment>(`${this.url}/${slug}/comments`, data,  this.httpOptions);
  }

  removeComment(slug: string, id: number): Observable<Comment>{
  	return this.http.delete<Comment>(`${this.url}/${slug}/comments/${id}`, this.httpOptions);
  }
  
}
