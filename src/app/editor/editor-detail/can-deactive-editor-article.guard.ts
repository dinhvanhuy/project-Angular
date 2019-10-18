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
		if (component.submited) {
			return true;
		}
		if (!component.changed) {
			return true;
		}

		return component.confirmService.confirm('Discard changes?');
	}
}
