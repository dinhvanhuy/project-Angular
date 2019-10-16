import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { CommentService } from 'src/app/services/comment.service';

@Injectable({
	providedIn: 'root'
})
export class CanDeactivateCommentGuardGuard implements CanDeactivate<ArticleDetailComponent> {
	input = '';
	constructor(private commentService: CommentService) {
		commentService.input
			.subscribe((input: string) => {
				this.input = input;
			});
	}
	canDeactivate(component: ArticleDetailComponent): Observable<boolean> | boolean {
		if (localStorage.getItem('token') == null || localStorage.getItem('token') === '') {
			return true;
		}
		if (this.input === '') {
			return true;
		}
		return component.confirmService.confirm('Discard changes?');
	}

}
