import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from 'src/app/services/article.service';
import { Articles } from 'src/app/models/articles';
import { AuthService } from 'src/app/auth/auth.service';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-home-article-list',
  templateUrl: './home-article-list.component.html',
  styleUrls: ['./home-article-list.component.css']
})
export class HomeArticleListComponent implements OnInit {
  //Các biến boolean check xem nav nào đang được chọn
  onFeed: boolean = true;
  onGlobal: boolean = false;
  onTag: boolean = true;
  token: string;
  articles: Article[]

  constructor(private httpClient: HttpClient, private articleService: ArticleService, private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggin
      .subscribe((status: boolean) => {
        if (status == false) {
          this.token = '';
          this.onClickGlobal()
        } else {
          this.token = this.authService.token;
          this.onClickFeed()
        }
      })
    this.token = localStorage.getItem('token');
    if (this.token == '') {
      this.onClickGlobal()
    } else {
      this.onClickFeed()
    }
  }

  onClickGlobal() {
    this.onFeed = false;
    this.onGlobal = true;
    this.articleService.getArticles()
      .subscribe((articals: Articles) => {
        this.articles = articals.articles;
        console.log(this.articles);
      })
  }

  onClickFeed() {
    this.onFeed = true;
    this.onGlobal = false;
    this.articleService.getFeedArticles()
      .subscribe((articals: Articles) => {
        this.articles = articals.articles;
        console.log(this.articles);
      })
  }

}
