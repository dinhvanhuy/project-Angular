import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from 'src/app/services/article.service';
import { Articles } from 'src/app/models/articles';
import { AuthService } from 'src/app/auth/auth.service';
import { Article } from 'src/app/models/article';
import { ArticlesList } from 'src/app/models/articlesList';
import { TagService } from 'src/app/services/tag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-article-list',
  templateUrl: './home-article-list.component.html',
  styleUrls: ['./home-article-list.component.css']
})
export class HomeArticleListComponent implements OnInit {
  //Các biến boolean check xem nav nào đang được chọn
  onFeed: boolean;
  onGlobal: boolean;
  onTag: boolean;
  token: string;
  articles;
  tag: string;
  articlesNumberReturn: number;
  pageArray: number[];
  currentPage: number = 1;

  //Khởi tạo page array để render ra HTML
  generatePageArray(articleAmount: number) {
    this.pageArray = [];
    let page = Math.ceil(articleAmount / 10);
    for (let i = 1; i <= page; i++) {
      this.pageArray.push(i);
    }
  }

  constructor(private articleService: ArticleService,
    private authService: AuthService,
    private tagService: TagService,
    private route: Router) { }

  ngOnInit() {
    //Hiển thị list article khi người dùng vào trang home, tùy thuộc vào trạng thái đăng nhập.
    //Nếu đã đăng nhập sẽ hiển thị new feed, chưa đăng nhập sẽ hiển thị global feed
    this.authService.isLoggin
      .subscribe((status: boolean) => {
        if (status) {
          this.onClickFeed()
          this.onGlobal = false;
          this.onFeed = true;
          this.token = localStorage.getItem('token');
        } else {
          this.onFeed = false;
          this.onGlobal = true
          this.onClickGlobal()
          this.token = '';
        }
      })
    if (localStorage.getItem('token') == null) {
      this.onClickGlobal()
      this.onGlobal = true;
      this.onFeed = false;
      this.token = '';
    } else {
      this.onClickFeed()
      this.onGlobal = false;
      this.onFeed = true;
      this.token = localStorage.getItem('token');
    }
    //Lắng nghe sự kiện có người chọn tag để xem bài viết
    this.tagService.onClickedTag
      .subscribe((tag: string) => {
        //Bỏ trạng thái đang active của các link global và feed
        this.tag = tag;
        this.onTag = true;
        this.onFeed = false;
        this.onGlobal = false;
        // console.log(this.tag);
        //Get các kết quả các list articles trả về tương ứng với tag 
        this.articleService.getArticlesByTag(0, tag)
          .subscribe((articles: ArticlesList) => {
            this.articles = articles.articles;
            this.articlesNumberReturn = articles.articlesCount;
            this.generatePageArray(this.articlesNumberReturn);
          })
      })
  }

  onClickGlobal(offset: number = 0) {
    this.onFeed = false;
    this.onGlobal = true;
    this.onTag = false;
    this.articleService.getArticles(offset)
      .subscribe((articles: ArticlesList) => {
        this.articles = articles.articles;
        this.articlesNumberReturn = articles.articlesCount;
        this.generatePageArray(this.articlesNumberReturn);
      })
  }

  onClickFeed(offset: number = 0) {
    this.onFeed = true;
    this.onGlobal = false;
    this.onTag = false;
    this.articleService.getFeedArticles(offset)
      .subscribe((articles: ArticlesList) => {
        this.articles = articles.articles;
        this.articlesNumberReturn = articles.articlesCount;
        this.generatePageArray(this.articlesNumberReturn);
      }, () => {
        console.log("You have to login first")
      })
  }

  onClickPage(page: number) {
    this.currentPage = page;
    if (this.onFeed) {
      this.onClickFeed((page - 1) * 10)
    }
    if (this.onGlobal) {
      this.onClickGlobal((page - 1) * 10)
    }
    if (this.onTag) {
      this.articleService.getArticlesByTag((page - 1) * 10, this.tag)
        .subscribe((articles: ArticlesList) => {
          this.articles = articles.articles;
          this.articlesNumberReturn = articles.articlesCount;
          this.generatePageArray(this.articlesNumberReturn);
        })
    }
  }

  //Like/Unlike 1 article
  toogleLike(heart: HTMLElement, {slug}) {
    let token = localStorage.getItem('token');
    if (token == '' || token == null) {
      this.route.navigate(['/login'])
    } else {
      //Thay đổi nút heart ở trang chủ
      let classString = heart.className;
      if (heart.classList.contains('btn-outline-primary')){
        //Nếu đang chưa like thì chuyển thành like
        heart.classList.remove('btn-outline-primary');
        heart.classList.add('btn-primary');
        let num = Number(heart.innerText) + 1;        
        heart.lastChild.replaceWith(document.createTextNode(' ' + num.toString()))
        this.articleService.addFavoritedArticle(slug)
          .subscribe((article) => {
            // console.log('Đã like');
            
          })
      } else {
        //Và ngược lại
        heart.classList.remove('btn-primary');
        heart.classList.add('btn-outline-primary');
        let num = Number(heart.innerText) - 1;
        heart.lastChild.replaceWith(document.createTextNode(' ' + num.toString()))
        this.articleService.removeFavoritedArticle(slug)
          .subscribe((article) => {
            // console.log('Đã dislike');
          })
      }
    }
  }

  onClickTag(tag: string) {
    this.tagService.onClickedTag.emit(tag);
  }

}
