import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor-detail/editor-detail.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { AuthGuard } from '../auth/auth.guard';
import { CanDeactiveEditorArticleGuard } from './editor-detail/can-deactive-editor-article.guard';
import { CanDeactivateCommentGuardGuard } from './comment-detail/can-deactivate-comment-guard.guard';
import { AuthService } from '../auth/auth.service';


const routes: Routes = [
	{
		path: 'editor/:slug',
		canActivate: [AuthGuard],
		component: EditorComponent,
		canDeactivate: [CanDeactiveEditorArticleGuard]
	},
	{
		path: 'editor',
		component: EditorComponent,
		canActivate: [AuthGuard],
		canDeactivate: [CanDeactiveEditorArticleGuard]
	},
	{
		path: 'article/:slug',
		component: ArticleDetailComponent,
		canDeactivate: [CanDeactivateCommentGuardGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EditorRoutingModule { }
