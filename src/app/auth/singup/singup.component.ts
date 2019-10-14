import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ErrorSignup } from '../../models/httpErrorResponse';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  signupForm: FormGroup;
  errorList: string[] = [];

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    console.log(this.signupForm);
    this.authService.signup(
      this.signupForm.controls['name'].value,
      this.signupForm.controls['email'].value,
      this.signupForm.controls['password'].value)
      .subscribe((data) => {
        console.log(data);
        this.authService.login(this.signupForm.controls['email'].value, this.signupForm.controls['password'].value)
          .subscribe((user: User) => {
            console.log(user);
            //Gán user đang đăng nhập vào user trong UserService
            this.userService.user = user; 
            //Gán token vào localStorage
            this.authService.token = user.user.token;
            localStorage.setItem('token', this.authService.token);
            localStorage.setItem('email', user.user.email);
            localStorage.setItem('username', this.userService.user.user.username);
            if (user.user.bio == '' || user.user.bio == null) {
              localStorage.setItem('bio', '');
            } else {
              localStorage.setItem('bio', user.user.bio);
            }
            if (user.user.image == '' || user.user.image == null) {
              localStorage.setItem('image', '');
            } else {
              localStorage.setItem('image', user.user.image);
            }
            //Thay đổi trạng thái thành đã đăng nhập
            this.authService.isLoggin.emit(false);
            this.authService.isLoggin.emit(true);
            //Đưa về trang chủ sau khi đã đăng nhập
            this.router.navigate(['/']);
            // console.log(user.user.email);
          })
      }, (errorSignup: ErrorSignup) => {
        this.errorList = [];
        for (let prop in errorSignup.error.errors) {
          if (prop == 'email') {
            this.errorList.push('email has already been taken');
          }
          if (prop == 'password') {
            this.errorList.push('password is too short (minimum is 8 characters)');
          }
          if (prop == 'username') {
            this.errorList.push('username has already been taken');
          }
        }
        console.log(this.errorList)
      })
  }

}
