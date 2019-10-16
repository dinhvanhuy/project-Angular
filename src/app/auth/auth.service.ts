import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	// Đấy là 1 EventEmitter để bao lấy trạng thái đăng nhập của user, nếu user đăng nhập nó sẽ emit ra true
	// đăng xuất sẽ emit ra fale, chúng ta dựa nó để thay đổi DOM tùy theo trạng thái đăng nhập của người dùng.
	isLoggin = new EventEmitter<boolean>();
	token: string;
	loginUrl = `https://conduit.productionready.io/api/users/login`;
	signupUrl = `https://conduit.productionready.io/api/users`;
	// Store link mà chúng ta sẽ điều hướng cho user sau khi login thành công
	redirectUrl: string;

	constructor(private httpClient: HttpClient) { }

	login(email: string, password: string): Observable<User>  {
		// console.log(email, password);
		localStorage.setItem('password', password);
		return this.httpClient.post<User>(this.loginUrl, {
			user: {
				email,
				password
			}
		});
	}

	signup(name: string, email: string, password: string): Observable<User> {
		localStorage.setItem('password', password);
		return this.httpClient.post<User>(this.signupUrl, {
			user: {
				username: name,
				email,
				password
			}
		});
	}
}
