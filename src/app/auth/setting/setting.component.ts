import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ErrorSignup } from 'src/app/models/httpErrorResponse';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  settingForm: FormGroup;
  errorList: string[];

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { 
  
  }

  ngOnInit() {
    this.settingForm = new FormGroup({
      'pictureUrl': new FormControl(this.userService.user.user.image),
      'name': new FormControl(this.userService.user.user.username),
      'bio': new FormControl(this.userService.user.user.bio),
      'email': new FormControl(this.userService.user.user.email),
      'password': new FormControl(this.userService.user.user.password)
    })
  }

  onSubmit() {
    console.log(this.settingForm);
    this.userService.updateProFile(this.settingForm.controls['pictureUrl'].value, 
                                  this.settingForm.controls['name'].value,
                                  this.settingForm.controls['bio'].value,
                                  this.settingForm.controls['email'].value,
                                  this.settingForm.controls['password'].value)
      .subscribe((user: User) => {
        this.userService.user = user;
      }, (error: ErrorSignup) => {
        this.errorList = [];
        //Lưu lại danh sách các error trả về
        for (let prop in error.error.errors) {
          if (prop == 'email') {
            for (let errorMess of error.error.errors['email']) {
              this.errorList.push(`Email ${errorMess}`)
            }
          }
          if (prop == 'username') {
            for (let errorMess of error.error.errors['username']) {
              this.errorList.push(`Username ${errorMess}`)
            }
          }
          if (prop == 'password') {
            for (let errorMess of error.error.errors['password']) {
              this.errorList.push(`Password ${errorMess}`)
            }
          }
        }
        // console.log(this.errorList);
      })
  }

  onLogout() {
    //thay đổi tình trạng đăng nhập, xóa token trong máy
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.authService.isLoggin = false;
    this.authService.token = '';
    //Điều hướng về trang chủ
    this.router.navigate(['/']);
  }

}
