import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor-detail/editor-detail.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';


const routes: Routes = [
  {
    path: 'editor/:slug',
    component: EditorComponent,
  },
  {
    path: 'editor',
    component: EditorComponent,
  },
  {
    path: 'article/:slug',
    component: ArticleDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule { }
