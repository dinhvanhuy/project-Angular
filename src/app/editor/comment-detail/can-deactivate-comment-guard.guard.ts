import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CommentDetailComponent } from "./comment-detail.component";
import { ArticleDetailComponent } from "../article-detail/article-detail.component";
import { CommentService } from 'src/app/services/comment.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateCommentGuardGuard implements CanDeactivate<ArticleDetailComponent> {
  input: string = '';
  constructor(private commentService: CommentService) {
    commentService.input
      .subscribe((input: string) => {
        this.input = input;
      })
  }
  canDeactivate(
    component: ArticleDetailComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean { 
    if (this.input == '') {
      return true;
    }
    return component.confirmService.confirm('Discard changes?');
  }
  
}
