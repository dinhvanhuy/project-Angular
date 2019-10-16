import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service'

import { ArticleService} from '../../services/article.service';
import { Author } from '../../models/author';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
})
export class ArticleDetailComponent implements OnInit {
	public slug: string;
	public markdown: string;
  public isView: boolean  = false;
  public article: any;
  public author: Author;
  public follow: string;
  public favorite: string;
  public username: string;
  public params : string;
  public isAuth: boolean = false;
  constructor(private articleService: ArticleService, 
  	private router: ActivatedRoute,
  	private route: Router,
    private userService: UserService,
    public confirmService: ConfirmService
  	) { }

  ngOnInit() {
  	this.router.params.subscribe((params: any) => {
  		this.slug =  params.slug;
  	});
    this.getDetailArticle(this.slug);

    if(localStorage.getItem('token') == null) {
      this.isAuth = true;
    }

  }

  removeArticle() {
  	this.router.params.subscribe((params: any) => {
  		this.articleService.removeArticle(params.slug)
  		.subscribe(() => {
  			this.route.navigate(['/']);
  		}) 

  	})
  }

  getDetailArticle(slug: string) {
  	this.articleService.getArticle(slug).subscribe((article: any) => {
      this.article = article.article;
      this.author = article.article.author;
      this.username =  article.article.author.username;
      this.params =  '/@' + article.article.author.username;
  		this.markdown = article.article.body;
      this.follow = this.author.following  ? 'Unfollow' : 'Follow';
      this.favorite = this.article.favorited ? 'Unfavorite' : 'Favorite';
      if(this.author.username !== localStorage.getItem('username') || localStorage.getItem('username') == null) {
        this.isView =  true;
      }
  	})
  }

  editArticle() {
  	this.route.navigate(['/editor', this.slug]);
  }

  veryfyAuth() {
    if(localStorage.getItem('username') == null) {
      return this.route.navigate(['/login']);
    }
  }

  updateFavoriteArticle(favorited: string) {
    this.veryfyAuth();
    this.article.favorited = !favorited;
    favorited ? this.article.favoritesCount-- : this.article.favoritesCount++;
    this.favorite = !favorited ? 'Unfavorite' : 'Favorite';
    this.article.favorited ? this.articleService.addFavoritedArticle(this.slug).subscribe() : this.articleService.removeFavoritedArticle(this.slug).subscribe();
  }

  getProfile(userName: string) {
    this.route.navigate([`@${userName}`])
  }

  updateFollow(following: string) {
    this.veryfyAuth();
    this.author.following = !following;
    this.follow = !following ? 'Unfollow' : 'Follow';
    this.author.following ? this.userService.followUser(this.username).subscribe() : this.userService.unfollowUser(this.username).subscribe();
  }

}
