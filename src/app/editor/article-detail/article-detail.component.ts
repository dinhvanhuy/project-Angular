import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service'

import { ArticleService} from '../../services/article.service';
import { Article } from '../../models/article';
import { Author } from '../../models/author';

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
  constructor(private articleService: ArticleService, 
  	private router: ActivatedRoute,
  	private route: Router,
    private userService: UserService,
  	) { }

  ngOnInit() {
  	this.router.params.subscribe((params: any) => {
  		this.slug =  params.slug;
  	});
    this.getDetailArticle(this.slug);

  }

  removeArticle() {
  	this.router.params.subscribe((params: any) => {
  		this.articleService.removeArticle(params.slug)
  		.subscribe(() => {
  			this.route.navigate(['/editor']);
  		}) 

  	})
  }

  getDetailArticle(slug: string) {
  	this.articleService.getArticle(slug).subscribe((article: any) => {
      this.article = article.article;
      this.author = article.article.author;
      this.username =  this.author.username;
      this.params =  '/@'+this.author.username;
  		this.markdown = article.article.body;
      this.follow = this.author.following  ? 'Unfollow' : 'Follow';
      this.favorite = this.article.favorited ? 'Unfavorite' : 'Favorite';
      if(this.author.username !== localStorage.getItem('username')) {
        this.isView =  true;
      }
  	})
  }

  editArticle() {
  	this.route.navigate(['/editor', this.slug]);
  }

  updateFavoriteArticle() {
    if(this.favorite === 'Favorite') {
      this.articleService.addFavoritedArticle(this.slug).
      subscribe(article => {
        this.favorite = article.article.favorited ? 'Unfavorite' : 'Favorite';
        this.article = article.article;
      })
    } else {
      this.articleService.removeFavoritedArticle(this.slug).
      subscribe(article => {
        this.favorite = article.article.favorited ? 'Unfavorite' : 'Favorite';
        this.article = article.article;
      })
    }
  }

  getProfile(userName) {
    this.route.navigate([`@${userName}`])
  }


  updateFollow() {
    if(this.follow === 'Follow') {
      this.userService.followUser(this.username).
        subscribe(profile => {
        this.follow = profile.profile.following  ? 'Unfollow' : 'Follow';

      })
    } else {
      this.userService.unfollowUser(this.username).
        subscribe(profile => {
        this.follow = profile.profile.following  ? 'Unfollow' : 'Follow';
      })
    }
  }

}
