import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { SettingComponent } from './setting.component';

@Injectable({ providedIn: 'root' })

export class CanDeactivateGuard implements CanDeactivate<SettingComponent> {

	constructor() { }

	canDeactivate(component: SettingComponent): Observable<boolean> | boolean {
		if (component.onClickSubmit === true) {
			return true;
		}
		if (component.onClickLogout === true) {
			return true;
		}
		if (!component.changed) {
			return true;
		}
		return component.confirmService.confirm('Discard changes?');
	}
}
