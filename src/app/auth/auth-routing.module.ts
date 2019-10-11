import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { SettingComponent } from './setting/setting.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }, 
  {
    path: 'register',
    component: SingupComponent
  },
  {
    path: 'settings',
    component: SettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
