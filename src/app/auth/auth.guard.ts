import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Nếu người dùng đã đăng nhập (có token trong localStorage) thì cho tiếp tục truy cập
      let token = localStorage.getItem('token');
      if (token != '' && token != null) {
        return true
      }
      //else cho về trang đăng nhập
      this.router.navigate(['/login']);
      return false;
  }
  
}
