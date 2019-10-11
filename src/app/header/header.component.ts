import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = '';
  token: string;

  constructor(public authService: AuthService) { 
    
  }

  ngOnInit() {
    //gán token bằng token lưu trong localStorage
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username')
    //Tùy vào trạng thái đăng nhập để thay đổi token, qua đó thay đổi DOM hiển thị.
    this.authService.isLoggin
      .subscribe((status) => {
        if (status == false) {
          this.token = '' ;
          
        } else {
          this.username = localStorage.getItem('username')
          this.token = this.authService.token;
        }
      })
    
  }

}
