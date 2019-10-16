import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	signinForm: FormGroup;
	invalidError = '';

	constructor(
	 private authService: AuthService,
	 private router: Router,
	 private userService: UserService,
	 private articlesService: ArticleService
		) { }

	ngOnInit() {
		this.signinForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required])
    });
    this.articlesService.slug.subscribe((slug: string) => {
      console.log(slug);
      this.router.navigate(['article', slug]);
    });
	}

	onSubmit() {
		// console.log(this.signinForm);
		this.authService.login(this.signinForm.controls.email.value, this.signinForm.controls.password.value)
			.subscribe((user: User) => {
				// Gán user đang đăng nhập vào user trong UserService
				this.userService.user = user;
				// Gán token và info của người dùng vào localStorage để hiển thị ở trang chủ và trang setting, không thêm vào password
				this.authService.token = user.user.token;
				localStorage.setItem('token', this.authService.token);
				if (user.user.bio === '' || user.user.bio == null) {
					localStorage.setItem('bio', '');
				} else {
					localStorage.setItem('bio', user.user.bio);
				}
				if (user.user.image === '' || user.user.image == null) {
					localStorage.setItem('image', '');
				} else {
					localStorage.setItem('image', user.user.image);
				}

				localStorage.setItem('email', user.user.email);
				localStorage.setItem('username', this.userService.user.user.username);

				// Thay đổi trạng thái thành đã đăng nhập
				this.authService.isLoggin.emit(true);
        this.invalidError = '';
				// Đưa về trang chủ sau khi đã đăng nhập
				this.router.navigate(['/']);
			}, () => {
				this.invalidError = 'email or password is invalid';
			});
	}

}
