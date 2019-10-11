import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public articlesCount: number;
  public currentPage: number;
  public isView: boolean = false;
  public username = 'huy1994321';
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    if(this.username == 'huy1994321') {
      this.isView =  true;
    }
  }

  updateFollow() {

  }

  getSetting() {
    
  }

  getArticlesCount(articlesCount: number) {
    this.articlesCount = articlesCount;
  }

  getCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }

}
