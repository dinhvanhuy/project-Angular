import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingComponent } from "./setting.component";
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<SettingComponent> {

  constructor(private userService: UserService) {}

  canDeactivate(
    component: SettingComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      if (component.onClickSubmit == true) {
        return true;
      }
      if (component.onClickLogout == true) {
        return true;
      }
      let username = localStorage.getItem('username');
      let image = localStorage.getItem('image');
      let bio = localStorage.getItem('bio');
      let email = localStorage.getItem('email');
      let password = localStorage.getItem('password')
      if (component.settingForm.controls['pictureUrl'].value === image &&
        component.settingForm.controls['name'].value === username &&
        component.settingForm.controls['bio'].value === bio &&
        component.settingForm.controls['email'].value === email &&
        component.settingForm.controls['password'].value == password) {
          return true;
        }
      return component.confirmService.confirm('Discard changes?')
  }
}
