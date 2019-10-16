import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username = '';
  token: string;
  image: string;

  constructor(public authService: AuthService, private userService: UserService) {

  }

  ngOnInit() {
    // gán token bằng token lưu trong localStorage
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.image = localStorage.getItem('image');
    // Gán lại username hiển thị ở header theo tên mới thay đổi
    this.userService.nameChange
      .subscribe(() => {
        this.username = localStorage.getItem('username');
      });
    // Gán lại image hiển thị ở header nếu có ảnh mới hoặc xóa ảnh cũ
    this.userService.imageChange
      .subscribe((newImage: string) => {
        this.image = newImage;
      });
    // Tùy vào trạng thái đăng nhập để thay đổi token, qua đó thay đổi DOM hiển thị.
    this.authService.isLoggin
      .subscribe((status: boolean) => {
        if (status === false) {
          this.token = '';
        } else {
          this.username = localStorage.getItem('username');
          this.token = localStorage.getItem('token');
          this.image = localStorage.getItem('image');
        }
      });

  }

}
