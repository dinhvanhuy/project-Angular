import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ArticleService} from '../../../services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
})
export class ArticleDetailComponent implements OnInit {
	private idArticle:string;
	public markdown: string;
  constructor(private articleService: ArticleService, 
  	private router: ActivatedRoute,
  	private route: Router
  	) { }

  ngOnInit() {
  	this.router.params.subscribe((params: any) => {
  		this.idArticle =  params.slug;
  	});

  	this.getDetailArticle(this.idArticle);


  }

  removeArticle() {
  	this.router.params.subscribe((params: any) => {
  		this.articleService.removeArticle(params.slug)
  		.subscribe((data) => {
  			this.route.navigate(['/editor']);
  		}) 

  	})
  }

  getDetailArticle(idArticle: string) {
  	this.articleService.getArticle(this.idArticle).subscribe(({article}) => {
  		this.markdown = article.body;
  	})
  }

  editArticle() {
  	console.log(this.idArticle);
  	this.route.navigate(['/editor', this.idArticle]);
  }

}
