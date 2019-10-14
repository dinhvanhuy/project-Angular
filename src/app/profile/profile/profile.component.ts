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
  private userName: string;
  public profile; 
  public follow: string;
  
  constructor(private articleService: ArticleService,
    private userService: UserService,
    private router: ActivatedRoute,
    private route: Router,
    ) { }

  ngOnInit() {
    this.router.params.subscribe(({userName}) => {
      this.userName = this.removeFirst(userName);
      if(this.userName === localStorage .getItem('username')) {
        this.isView =  true;
      }
      this.userService.getUserDetail(this.userName)
          .subscribe((profile: Profile) => {
            this.profile =  profile.profile;
            this.follow = this.profile.following ? 'Unfollow' : 'Follow';
          });
    })
  }

  removeFirst(params) {
     return params.replace('@', '').trim();
  }

  updateFollow() {
    if(this.follow === 'Follow') {
      this.userService.followUser(this.userName)
        .subscribe((profile: Profile) => {
          this.follow = profile.profile.following ? 'Unfollow' : 'Follow';
        })
    } else {
      this.userService.unfollowUser(this.userName)
        .subscribe((profile: Profile) => {
          this.follow = profile.profile.following ? 'Unfollow' : 'Follow';
        })
    }
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
