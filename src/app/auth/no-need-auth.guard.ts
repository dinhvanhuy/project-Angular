import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NoNeedAuthGuard implements CanActivate {

	constructor(private router: Router) {}

	canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
			// Nếu chưa đăng nhập thì cho đi tiếp
			const token = localStorage.getItem('token');
			if (token === '' || token == null) {
				return true;
			}
			// Nếu đã đăng nhập cho về trang chủ
			this.router.navigate(['/']);
			return false;
	}

}
