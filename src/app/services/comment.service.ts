import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article';
// import { Co} from '../models/author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public url = 'https://conduit.productionready.io/api/articles';
  public token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NzAzMTQsInVzZXJuYW1lIjoiMTExMTIyMjIyIiwiZXhwIjoxNTc1Njk5NjI1fQ.7UE50VF-4YLFNCpAKgfFZutfM4HOJ22Q73-EssP7D8E';
  public httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + this.token
      })
    }

  constructor(private http: HttpClient) { }

  getComment(slug: string): Observable<any> {
	return this.http.get(`${this.url}/${slug}/comments`, this.httpOptions);
  }

  addComment(slug: string, data: object): Observable<any>{
  	return this.http.post(`${this.url}/${slug}/comments`, data,  this.httpOptions);
  }

  removeComment(slug: string, id: number): Observable<any>{
  	return this.http.delete(`${this.url}/${slug}/comments/${id}`, this.httpOptions);
  }
}
