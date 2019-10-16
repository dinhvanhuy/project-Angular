import { Component, OnInit, Input,  Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Subscription, from } from 'rxjs';
import { Articles} from '../../models/articles';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit, OnDestroy {
	public articlesAuthor;
	public type: number;
  private userName: string;
	public subscription: Subscription;
	public params: string;
	public articlesCount: number;
	public limit: number = 10;
	isLoading: boolean;

	@Input() currentPage:number;
    constructor(private articleService: ArticleService,
  	private route: ActivatedRoute,
  	private router: Router
  	) { }

  ngOnInit() {

  	this.route.url.subscribe((params) => {
			this.isLoading = true;
      this.params = params[0].path;
      this.userName = this.removeFirst(params[0].path); 
  		if(params.length === 1) {
  			this.articleService.getArticleAuthor(this.userName)
			  	.subscribe((articles: Articles) => {
						this.isLoading = false;
			  		this.type = 1;
            if(articles.articlesCount > this.limit) {
              this.articleService.sendNumberArticle(articles.articlesCount);
            }
						this.articlesAuthor = articles.articles;
						this.articlesCount = articles.articlesCount;
  		});
  		} else {
  			this.articleService.getArticleFavorited(this.userName)
  			.subscribe((articles: Articles) => {
					this.isLoading = false;
  				this.type = 2;
          if(articles.articlesCount > this.limit) {
            this.articleService.sendNumberArticle(articles.articlesCount);
          }
					this.articlesAuthor = articles.articles;
					this.articlesCount = articles.articlesCount;
  		});
  		}
  	});

  	this.subscription = this.articleService.getIndexPage().
  		subscribe(({numberPage}) => {
  			if(numberPage != undefined) {
  				this.getData(numberPage * this.limit);
  			}
  		});
  }

  removeFirst(params) {
     return params.replace('@', '').trim();
  }

  getArticle(type: number) {
  	if(this.type === type) {
  		return;
  	}
  	type === 1 ? this.router.navigate([this.params]): this.router.navigate([this.params, 'favorites']);
  	
  }
  getProfile() {
    this.router.navigate([this.params])
  }

  getData(offset: number = 0) {
		if(this.type == 1) {
		this.articleService.getArticleAuthor(this.userName, offset.toString())
			.subscribe((articles: Articles) => {
				this.articlesAuthor = articles.articles;
		});
  	} else {
  		this.articleService.getArticleFavorited(this.userName, offset.toString())
  			.subscribe((articles: Articles) => {
  				this.articlesAuthor = articles.articles;
  		});
    }
  }	
	
	updateFavorited(favorited: boolean, i: number, slug: string) {
    if(localStorage .getItem('username') == null) {
      this.router.navigate(['/login'])
    }

		this.articlesAuthor =  this.articlesAuthor.map((item, index) => {
			if(i ===  index) {
				favorited ? item.favoritesCount-- : item.favoritesCount++;
				item.favorited = !item.favorited;
			}
			return item;
		});
		favorited ? this.articleService.removeFavoritedArticle(slug).subscribe() :this.articleService.addFavoritedArticle(slug).subscribe();
	}

  detailArticle(slug: string) {
  	this.router.navigate(['/article', slug])
  }
 	
 	ngOnDestroy() {
 		 if(this.subscription) {
      this.subscription.unsubscribe();
    }
 	}

}
