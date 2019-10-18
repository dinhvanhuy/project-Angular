import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ErrorSignup } from 'src/app/models/httpErrorResponse';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
	selector: 'app-setting',
	templateUrl: './setting.component.html',
	styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
	settingForm: FormGroup;
	errorList: string[];
	changed: boolean;
	onClickLogout = false; // Biến để xác định xem người dùng muốn chuyển sang route khác hay bấm logout
	onClickSubmit = false; // Biến để xác định xem người dùng muốn chuyển sang route khác hay bấm submit

	constructor(
		private userService: UserService,
		private authService: AuthService,
		private router: Router,
		public confirmService: ConfirmService) { }

	ngOnInit() {
		this.settingForm = new FormGroup({
			pictureUrl: new FormControl(localStorage.getItem('image') !== 'null' ? localStorage.getItem('image') : ''),
			name: new FormControl(localStorage.getItem('username')),
			bio: new FormControl(localStorage.getItem('bio') !== 'null' ? localStorage.getItem('bio') : ''),
			email: new FormControl(localStorage.getItem('email')),
			password: new FormControl(localStorage.getItem('password'))
		});
		// Sự kiện form được sửa đổi để bắt ở can deactivate ở guard
		this.settingForm.valueChanges.subscribe((changed) => {
			console.log(changed);
			if (
				changed.bio !== localStorage.getItem('bio') ||
				changed.email !== localStorage.getItem('email') ||
				changed.name !== localStorage.getItem('username') ||
				changed.pictureUrl !== localStorage.getItem('image') ||
				changed.password !== localStorage.getItem('password')
			) {
				this.changed = true;
			} else {
				this.changed = false;
			}
			console.log(this.changed);
		});
	}

	onSubmit() {
		// console.log(this.settingForm);
		this.onClickSubmit = true;
		this.userService.updateProFile(this.settingForm.controls.pictureUrl.value,
			this.settingForm.controls.name.value,
			this.settingForm.controls.bio.value,
			this.settingForm.controls.email.value,
			this.settingForm.controls.password.value)
			.subscribe((user: User) => {
				this.userService.user = user;
				localStorage.setItem('email', user.user.email);
				localStorage.setItem('username', this.userService.user.user.username);
				this.userService.nameChange.emit(user.user.username);
				this.userService.imageChange.emit(user.user.image);
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
				this.router.navigate([`@${localStorage.getItem('username')}`]);
			}, (error: ErrorSignup) => {
				this.errorList = [];
				// Lưu lại danh sách các error trả về
				// tslint:disable-next-line: forin
				for (const prop in error.error.errors) {
					if (prop === 'email') {
						for (const errorMess of error.error.errors.email) {
							this.errorList.push(`Email ${errorMess}`);
						}
					}
					if (prop === 'username') {
						for (const errorMess of error.error.errors.username) {
							this.errorList.push(`Username ${errorMess}`);
						}
					}
					if (prop === 'password') {
						for (const errorMess of error.error.errors.password) {
							this.errorList.push(`Password ${errorMess}`);
						}
					}
				}
				// console.log(this.errorList);
			});
	}

	onLogout() {
		// thay đổi tình trạng đăng nhập, xóa token trong máy
		this.onClickLogout = true;
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		localStorage.removeItem('password');
		localStorage.removeItem('image');
		localStorage.removeItem('bio');
		localStorage.removeItem('email');
		this.authService.token = '';
		this.authService.isLoggin.emit(false);
		// Điều hướng về trang chủ
		this.router.navigate(['/']);
	}

}
