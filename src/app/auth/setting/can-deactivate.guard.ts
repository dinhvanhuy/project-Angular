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
		const username = localStorage.getItem('username');
		const image = localStorage.getItem('image');
		const bio = localStorage.getItem('bio');
		const email = localStorage.getItem('email');
		const password = localStorage.getItem('password');
		if (component.settingForm.controls.pictureUrl.value === image &&
			component.settingForm.controls.name.value === username &&
			component.settingForm.controls.bio.value === bio &&
			component.settingForm.controls.email.value === email &&
			component.settingForm.controls.password.value === password) {
			return true;
		}
		return component.confirmService.confirm('Discard changes?');
	}
}
