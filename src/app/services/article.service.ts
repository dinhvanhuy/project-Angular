import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article';
import { Observable, Subject } from 'rxjs';
import { Articles } from '../models/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public url = 'https://conduit.productionready.io/api/articles';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    })
  }
  private subject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  public addArticle(data: any): Observable<Article> {
    return this.http.post<Article>(this.url, data, this.httpOptions);
  }

  public removeArticle(idArticle: string): Observable<Article> {
    return this.http.delete<Article>(`${this.url}/${idArticle}`, this.httpOptions)
  }

  public getArticle(idArticle: string): Observable<Article> {
    return this.http.get<Article>(`${this.url}/${idArticle}`, this.httpOptions);
  }

  public updateArticle(idArticle: string, data: any): Observable<Article> {
    return this.http.put<Article>(`${this.url}/${idArticle}`, data, this.httpOptions);
  }

  public getArticleAuthor(author: string, offset = 0) {
    let params = {
      author:author,
      limit: 5,
      offset: offset,
    };
    this.httpOptions['params'] = params;

    return this.http.get(this.url, this.httpOptions);
  }

  public getArticleFavorited(author: string, offset = 0) {
    let params =  {
      favorited:author,
      limit: 5,
      offset: offset,
    };
    this.httpOptions['params'] = params;

    return this.http.get(this.url, this.httpOptions);
  }

  public sendNumberArticle(numberArticle: number) {
    this.subject.next({ numberArticle: numberArticle });
  }

  public getNumberArticle() {
    return this.subject.asObservable();
  }

  public sendIndexPage(numberPage: number) {
    this.subject.next({ numberPage: numberPage });
  }

   public getIndexPage() {
    return this.subject.asObservable();
  }

  public addFavoritedArticle(slug: string): Observable<Article> {
    return this.http.post<Article>(`${this.url}/${slug}/favorite`, this.httpOptions)
  }

  public removeFavoritedArticle(slug: string): Observable<Article> {
    return this.http.delete<Article>(`${this.url}/${slug}/favorite`, this.httpOptions)
  }

  //Lấy danh sách các article mà user đang đăng nhập đang follow
  getFeedArticles(offset: number = 0): Observable<Articles> {
    let params = {
      'offset': offset.toString(),
      'limit': '5'
    }
    this.httpOptions['params'] = params;
    return this.http.get<Articles>(`https://conduit.productionready.io/api/articles/feed`, this.httpOptions)
  }

  //Lấy ra danh sách các article hiển thị ở trang chủ 
  getArticles(offset: number = 0): Observable<Articles> {
    return this.http.get<Articles>(`https://conduit.productionready.io/api/articles`, {
      params: {
        'limit': '5',
        'offset': offset.toString()
      }
    })
  }

}
