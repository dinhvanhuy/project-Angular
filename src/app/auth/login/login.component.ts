import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from '../auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  invalidError: string = '';

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    // console.log(this.signinForm);
    this.authService.login(this.signinForm.controls['email'].value, this.signinForm.controls['password'].value)
      .subscribe((user: User) => {
        //Gán user đang đăng nhập vào user trong UserService
        this.userService.user = user; 
        //Gán token vào localStorage
        // console.log(user);
        this.authService.token = user.user.token;
        localStorage.setItem('token', this.authService.token);
        localStorage.setItem('bio', user.user.bio);
        localStorage.setItem('email', user.user.email);
        localStorage.setItem('password', user.user.password);
        localStorage.setItem('username', this.userService.user.user.username);
        localStorage.setItem('image', this.userService.user.user.image);
        //Thay đổi trạng thái thành đã đăng nhập
        this.authService.isLoggin.emit(true);
        this.invalidError = '';
        //Đưa về trang chủ sau khi đã đăng nhập
        this.router.navigate(['/']);
        // console.log(user.user.email);
      }, () => {
        this.invalidError = "email or password is invalid";
      })
  }

}
