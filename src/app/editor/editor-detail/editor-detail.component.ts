import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { Comment } from '../../models/comment';

function minLength(control: FormControl) {
  if(control.value.length > 0) {
    return null;
  }
  return {
    message:true
  }
}


@Component({
  selector: 'app-editor',
  templateUrl: './editor-detail.component.html',
})
export class EditorComponent implements OnInit {
  public articleForm: FormGroup;
  public article = []; 
  public isEdit: boolean  = false;
  public slug: string;
  public tagLists: Array<string> = [];
  public submited: boolean = false;
  constructor(private articleService: ArticleService, 
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.articleForm =  this.formBuilder.group({
      title: ['', [Validators.required, minLength]],
      description: ['', [Validators.required, minLength]],
      body: ['', [Validators.required]],
      tagList: ['']
    });

    this.router.params.subscribe((params) => {
      this.isEdit = true;
      this.slug = params.slug;
      if(this.slug != undefined) {
         this.articleService.getArticle(this.slug)
        .subscribe(({article}) => {
          this.f.title.setValue(article.title);
          this.f.description.setValue(article.description);
          this.f.body.setValue(article.body);
          this.tagLists = article.tagList;
        })
      }
      })
     

  }

  addTag() {
    if(!this.f.tagList.value) {
      return;
    }

    this.tagLists.push(this.f.tagList.value);
    this.f.tagList.setValue('');
  }

  removeTag(i) {
    this.tagLists = this.tagLists.filter((item, index) => {
      if(index != i) {
        return item;
      }
    })
  }

  get f() {
    return this.articleForm.controls;
  }

  addArticle() {
    this.submited = true;
    if(this.articleForm.invalid) {
      return;
    }
    this.f.tagList.setValue(this.tagLists);
    const data = {
      article: {...this.articleForm.value}
    }
    if(this.slug != undefined) {
      this.articleService.updateArticle(this.slug, data)
      .subscribe((data: any) => {
        this.route.navigate(['/article', this.slug]);
      });
    } else {
      this.articleService.addArticle(data).subscribe((data: any) => {
      this.route.navigate(['/article', data.article.slug]);
    }); 
    }
  }
}
