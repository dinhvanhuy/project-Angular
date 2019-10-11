import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleService} from '../../services/article.service';
import { Article } from 'src/app/models/article';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
})
export class ArticleDetailComponent implements OnInit {
	public slug: string;
	public markdown: string;
  public isView: boolean  = false;
  public article: Article;
  constructor(private articleService: ArticleService, 
  	private router: ActivatedRoute,
  	private route: Router
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
  	this.articleService.getArticle(slug).subscribe((article: Article) => {
  		this.markdown = article.article.body;
      this.article = article;
      if(article.article.author.username != 'huy1994321') {
        this.isView =  true;
      }
  	})
  }

  editArticle() {
  	this.route.navigate(['/editor', this.slug]);
  }

  updateFavoriteArticle() {

  }

  updateFollow() {

  }

}
