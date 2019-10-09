import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
  	this.articleService.getArticleAuthor('huy1994321')
  	.subscribe((data) => {
  		console.log(data);
  	});
  	// this.articleService.getArticleFavorited('huy1994321')
  	// .subscribe((data) => {
  	// 	console.log(data);
  	// })
  	this.articleService.getArticleFavorited('huy1994321')
  	.subscribe((data) => {
  		console.log(data);
  	})
  }

  getArticle() {
  	this.articleService.getArticleFavorited('huy1994321')
  	.subscribe((data) => {
  		console.log(data);
  	})
  }

}
