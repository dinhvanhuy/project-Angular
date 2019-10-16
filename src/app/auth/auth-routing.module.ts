import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { SettingComponent } from './setting/setting.component';
import { AuthGuard } from './auth.guard';
import { NoNeedAuthGuard } from './no-need-auth.guard';
import { CanDeactivateGuard } from './setting/can-deactivate.guard';


const routes: Routes = [
	{
		path: 'login',
		canActivate: [NoNeedAuthGuard],
		component: LoginComponent
	},
	{
		path: 'register',
		canActivate: [NoNeedAuthGuard],
		component: SingupComponent
	},
	{
		path: 'settings',
		canActivate: [AuthGuard],
		canDeactivate: [CanDeactivateGuard],
		component: SettingComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
