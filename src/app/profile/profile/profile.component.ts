import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { UserService } from '../../services/user.service';
import { Profile }  from '../../models/profile';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public articlesCount: number;
  public currentPage: number;
  public isView: boolean = false;
  public username: string;
  public profile: Profile; 
  constructor(private articleService: ArticleService,
    private userService: UserService,
    private router: ActivatedRoute,
    private route: Router,
    ) { }

  ngOnInit() {
    this.router.params.subscribe(({userName}) => {
      if(userName === localStorage.getItem('username')) {
        this.isView =  true;
        this.userService.getUserDetail(userName)
          .subscribe((profile: Profile) => {
            this.profile =  profile;
          });
      }
    })
  }

  updateFollow() {

  }

  getSetting() {
    this.route.navigate(['/settings']);
  }

  getArticlesCount(articlesCount: number) {
    this.articlesCount = articlesCount;
  }

  getCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }

}
