import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor-detail.component.html',
})
export class EditorComponent implements OnInit {
  public articleForm: FormGroup;
  public article = []; 
  public isEdit: boolean  = false;
  public idArticle: string;
  constructor(private articleService: ArticleService, 
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.articleForm =  this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tagList: ['']
    });

    this.router.params.subscribe((params) => {
      this.isEdit = true;
      this.idArticle = params.slug;
      this.articleService.getArticle(this.idArticle)
        .subscribe(({article}) => {
          this.articleForm.controls.title.setValue(article.title);
          this.articleForm.controls.description.setValue(article.description);
          this.articleForm.controls.body.setValue(article.body);
        })
    })

  }

  addArticle() {
    const data = {
      article: {...this.articleForm.value}
    }
    if(this.idArticle != undefined) {
      this.articleService.updateArticle(this.idArticle, data)
      .subscribe((data: any) => {
        this.route.navigate(['editor/article', this.idArticle]);
      });
    } else {
      this.articleService.addArticle(data).subscribe((data: any) => {
      this.route.navigate(['editor/article', data.article.slug]);
    }); 
    }
  }
}
