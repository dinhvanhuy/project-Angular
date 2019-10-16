import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comment';
import { Comments } from '../models/comments';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class CommentService {
	input = new EventEmitter<string>();
	public url = 'https://conduit.productionready.io/api/articles';
	public httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				Authorization: `Token ${localStorage.getItem('token')}`
			})
		};

	constructor(private http: HttpClient, private userService: UserService, authService: AuthService) {
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

	getComment(slug: string): Observable<Comments> {
		return  localStorage.getItem('token') ?
		this.http.get<Comments>(`${this.url}/${slug}/comments`, this.httpOptions) :
		this.http.get<Comments>(`${this.url}/${slug}/comments`);
	}

	addComment(slug: string, data: object): Observable<Comment> {
		return this.http.post<Comment>(`${this.url}/${slug}/comments`, data, this.httpOptions);
	}

	removeComment(slug: string, id: number): Observable<Comment> {
		return this.http.delete<Comment>(`${this.url}/${slug}/comments/${id}`, this.httpOptions);
	}
}
