import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public url = 'https://conduit.productionready.io/api/articles';
  public token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NzAzMTQsInVzZXJuYW1lIjoiMTExMTIyMjIyIiwiZXhwIjoxNTc1Njk5NjI1fQ.7UE50VF-4YLFNCpAKgfFZutfM4HOJ22Q73-EssP7D8E'
  public httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Token ' + this.token
      })
    }
  constructor(private http: HttpClient) {
  }

  public addArticle(data: any): Observable<Article[]> {
    return this.http.post<Article[]>(this.url, data, this.httpOptions);
  }

  public removeArticle(idArticle: string): Observable<Article []> {
    return this.http.delete<Article[]>(`${this.url}/${idArticle}`, this.httpOptions)
  }

  public getArticle(idArticle: string): Observable<Article []> {
    return this.http.get<Article[]>(`${this.url}/${idArticle}`, this.httpOptions);
  }

  public updateArticle(idArticle: string, data: any): Observable<Article[]> {
    return this.http.put<Article[]>(`${this.url}/${idArticle}`, data, this.httpOptions);
  }

  public getArticleAuthor(author: string, limit = 5, offset = 0) {
    return this.http.get(this.url, {params: {
      author:author,
      limit:limit,
      offset: 0,
    }
    }, this.httpOptions);
  }

  public getArticleFavorited(author: string, limit = 5, offset = 0) {
    return this.http.get(this.url, {params: {
      favorited:author,
      limit:limit,
      offset: 0,
    }
    }, this.httpOptions);
  }


}
