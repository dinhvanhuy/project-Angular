import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ListArticleComponent } from './list-article/list-article.component';
import { ProfileComponent } from './profile/profile.component';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [ListArticleComponent, ProfileComponent, PaginationComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
