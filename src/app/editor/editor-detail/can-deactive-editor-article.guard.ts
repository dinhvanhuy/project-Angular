import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { EditorComponent } from './editor-detail.component';

@Injectable({
	providedIn: 'root'
})
export class CanDeactiveEditorArticleGuard implements CanDeactivate<EditorComponent> {
	canDeactivate(
		component: EditorComponent,
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | true {
		// console.log(component.articleForm);
		// console.log(component.isEdit)
		if (component.submited) {
			return true;
		}
		if (component.isEdit === false) {
			if (component.articleForm.controls.body.value === '' &&
				component.articleForm.controls.description.value === '' &&
				component.articleForm.controls.tagList.value === '' &&
				component.articleForm.controls.title.value === '') {
				// console.log('vào đây');
				return true;
			}
		} else {
			if (component.defaultArticle.article.title === component.articleForm.controls.title.value &&
				component.defaultArticle.article.description === component.articleForm.controls.description.value &&
				component.defaultArticle.article.body === component.articleForm.controls.body.value &&
				component.articleForm.controls.tagList.value === '' &&
				!component.enterNewTag) {
				return true;
			}
		}

		return component.confirmService.confirm('Discard changes?');
	}
}
