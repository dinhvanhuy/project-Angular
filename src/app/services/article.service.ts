import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Article } from '../models/article';
import { Observable, Subject } from 'rxjs';
import { ArticlesList } from '../models/articlesList';
import { AuthService } from '../auth/auth.service';

interface HttpOptions {
	headers: HttpHeaders;
	params?: {};
}

@Injectable({
	providedIn: 'root'
})

export class ArticleService {
	slug = new EventEmitter<string>();
	public url = 'https://conduit.productionready.io/api/articles';
	private userUrl = 'https://conduit.productionready.io/api/profiles';
	public httpOptions: HttpOptions = {
		headers: new HttpHeaders({
			'Content-Type':  'application/json',
			Authorization: `Token ${localStorage.getItem('token')}`
		})
	};
	private follow: string;
	private subject = new Subject<any>();

	constructor(private http: HttpClient, private authService: AuthService) {
		authService.isLoggin
			.subscribe((status) => {
				if (status) {
					this.httpOptions = {
						headers: new HttpHeaders({
							'Content-Type':  'application/json',
							Authorization: `Token ${localStorage.getItem('token')}`
						})
					};
				}
			});
	}

	public addArticle(data: any): Observable<Article> {
		return this.http.post<Article>(this.url, data, this.httpOptions);
	}

	public removeArticle(slug: string): Observable<Article> {
		return this.http.delete<Article>(`${this.url}/${slug}`, this.httpOptions);
	}

	public getArticle(slug: string): Observable<Article> {
		return localStorage.getItem('token') ?
			this.http.get<Article>(`${this.url}/${slug}`, this.httpOptions) :
			this.http.get<Article>(`${this.url}/${slug}`);
	}

	public updateArticle(slug: string, data: any): Observable<Article> {
		return this.http.put<Article>(`${this.url}/${slug}`, data, this.httpOptions);
	}

	public getArticleAuthor(author: string, offset = '0') {
		const params = {
			author,
			limit: '10',
			offset: offset.toString(),
		};
		if (localStorage.getItem('token')) {
			this.httpOptions.params = params;

			return this.http.get(this.url, this.httpOptions);
		}

		return this.http.get(this.url, { params: {...params}});
	}

	public getArticleFavorited(author: string, offset = '0') {
		const params = {
			favorited: author,
			limit: '10',
			offset: offset.toString(),
		};
		if (localStorage.getItem('token')) {
			this.httpOptions.params = params;

			return this.http.get(this.url, this.httpOptions);
		}

		return this.http.get(this.url, { params: {...params}});
	}

	public sendNumberArticle(numberArticle: number) {
		this.subject.next({ numberArticle });
	}

	public getNumberArticle() {
		return this.subject.asObservable();
	}

	public sendIndexPage(numberPage: number) {
		this.subject.next({ numberPage });
	}

		public getIndexPage() {
		return this.subject.asObservable();
	}

	public addFavoritedArticle(slug: string): Observable<Article> {
		return this.http.post<Article>(`${this.url}/${slug}/favorite`,
			{ withCredentials: true }, this.httpOptions);
	}

	public removeFavoritedArticle(slug: string): Observable<Article> {
		return this.http.delete<Article>(`${this.url}/${slug}/favorite`, this.httpOptions);
	}

	// Lấy danh sách các article mà user đang đăng nhập đang follow
	getFeedArticles(offset: number = 0): Observable<ArticlesList> {
		const httpHeader = new HttpHeaders({
			'Content-Type':  'application/json',
			Authorization: `Token ${localStorage.getItem('token')}`
		});
		const params = {
			offset: offset.toString(),
			limit: '10'
		};
		this.httpOptions.params = params;
		return this.http.get<ArticlesList>(`https://conduit.productionready.io/api/articles/feed`, {
			headers: httpHeader,
			params
		});
	}

	// Lấy ra danh sách các article hiển thị ở trang chủ
	getArticles(offset: number = 0): Observable<ArticlesList> {
		const token = localStorage.getItem('token');
		if (token === '' || token == null) {
			return this.http.get<ArticlesList>(`https://conduit.productionready.io/api/articles`, {
				params: {
					limit: '10',
					offset: offset.toString()
				}
			});
		}
		return this.http.get<ArticlesList>(`https://conduit.productionready.io/api/articles`, {
			params: {
				limit: '10',
				offset: offset.toString()
			},
			headers: {
				'Content-Type':  'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`
			}
		});
	}

	getArticlesByTag(offset: number = 0, tag: string): Observable<ArticlesList> {
		return this.http.get<ArticlesList>(`https://conduit.productionready.io/api/articles`, {
			params: {
				limit: '10',
				offset: offset.toString(),
				tag
			}
		});
	}
}
