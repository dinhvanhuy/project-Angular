import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule } from '@angular/forms';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor-detail/editor-detail.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { CommentDetailComponent } from './comment-detail/comment-detail.component';



@NgModule({
  declarations: [EditorComponent, ArticleDetailComponent, CommentDetailComponent],
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    EditorRoutingModule,
  ]
})
export class EditorModule { }
