import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { HomeArticleListComponent } from './home-article-list/home-article-list.component';
import { HomePaginationComponent } from './home-pagination/home-pagination.component';
import { HomeTagListComponent } from './home-tag-list/home-tag-list.component';


@NgModule({
  declarations: [HomeComponent, HomeArticleListComponent, HomePaginationComponent, HomeTagListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
