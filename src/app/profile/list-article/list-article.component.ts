import { Component, OnInit, Input,  Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Subscription, from } from 'rxjs';
import { Article } from '../../models/article';
import { Articles} from '../../models/articles';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit, OnDestroy {
	public articlesAuthor: Array<Article>;
	public type: number;
	public subscription: Subscription;

	@Input() currentPage:number;
    constructor(private articleService: ArticleService,
  	private route: ActivatedRoute,
  	private router: Router
  	) { }

  ngOnInit() {

  	this.route.url.subscribe((params) => {
  		if(params.length === 1) {
  			this.articleService.getArticleAuthor('huy1994321')
			  	.subscribe((articles: Articles) => {
			  		this.type = 1;
            this.articleService.sendNumberArticle(articles.articlesCount);
           console.log(articles.articlesCount)
            
            this.articlesAuthor = articles.articles;
  		});
  		} else {
  			this.articleService.getArticleFavorited('huy1994321')
  			.subscribe((articles: Articles) => {
  				this.type = 2;
          this.articleService.sendNumberArticle(articles.articlesCount);
  				this.articlesAuthor = articles.articles;
  		});
  		}
  	});
  	

  	this.subscription = this.articleService.getIndexPage().
  		subscribe(({numberPage}) => {
  			if(numberPage != undefined) {
  				this.getData(numberPage*5);
  			}
  		});
  }

  getArticle(type: number) {
  	if(this.type === type) {
  		return;
  	}
  	type === 1 ? this.router.navigate(['profile/huy1994321']): this.router.navigate(['profile/huy1994321/favorites']);
  	
  }

  getData(offset: number = 0) {
		if(this.type == 1) {
		this.articleService.getArticleAuthor('huy1994321', offset)
			.subscribe((articles: Articles) => {
				this.articlesAuthor = articles.articles;
		});
  	} else {
  		this.articleService.getArticleFavorited('huy1994321', offset)
  			.subscribe((articles: Articles) => {
  				this.articlesAuthor = articles.articles;
  		});
  }
}	
	
	updateFavorited(favorited: boolean, favoritesCount: number, i: number, slug: string) {
		this.articlesAuthor =  this.articlesAuthor.map((item, index) => {
			if(i ===  index) {
				favorited ? item.article.favoritesCount-- : item.article.favoritesCount++
				item.article.favorited = !item.article.favorited;
			}
			return item;
		});
		favorited ? this.articleService.removeFavoritedArticle(slug).subscribe() :this.articleService.addFavoritedArticle(slug).subscribe();

	}

  detailArticle(slug: string) {
  	this.router.navigate(['editor/article', slug])
  	
  }
 	
 	ngOnDestroy() {
 		 if(this.subscription) {
      this.subscription.unsubscribe();
    }
 	}

}
