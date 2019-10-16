import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Subscription } from 'rxjs';


@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnDestroy {
	public totalPages = [];
	public pageNumber = 0;
	public subscription: Subscription;

	constructor(private articleService: ArticleService) { }

	ngOnInit() {
		this.subscription = this.articleService.getNumberArticle()
			.subscribe(({numberArticle}) => {
				this.getPage(numberArticle);
		});
	}

	getPage(articlesCount: number) {
		for (let i = 1; i <= Math.ceil(articlesCount / 10); i++) {
			this.totalPages.push(i);
		}
	}

	getIndexPage(index: number) {
		this.pageNumber = index;
		this.articleService.sendIndexPage(index);
	}

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
