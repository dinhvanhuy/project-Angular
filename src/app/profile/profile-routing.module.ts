import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ListArticleComponent } from './list-article/list-article.component';


const routes: Routes = [
	{
		path:'huy1994321',
		component: ProfileComponent,
	},
	{
		path: 'huy1994321/favorites',
		component: ProfileComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
