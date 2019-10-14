import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggin
      .subscribe((status: boolean) => {
        this.isLoggedIn = status;
        console.log(this.isLoggedIn)
      })
  }

}
