import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { ConfirmService } from 'src/app/services/confirm.service';

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
  //Nếu ở trạng thái edit thì article sẽ được lưu vào defaultArticle để gửi sang can deactivate để check
  public defaultArticle;
  //Biến kiểm tra nếu có tag được nhập để check trong deactivate
  public enterNewTag: boolean = false;
  constructor(private articleService: ArticleService, 
    private formBuilder: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    public confirmService: ConfirmService 
    ) { }

  ngOnInit() {
    this.articleForm =  this.formBuilder.group({
      title: ['', [Validators.required, minLength]],
      description: ['', [Validators.required, minLength]],
      body: ['', [Validators.required]],
      tagList: ['']
    });

    this.router.params.subscribe((params) => {
      this.slug = params.slug;
      if(this.slug != undefined) {
         this.articleService.getArticle(this.slug)
        .subscribe((article: Article) => {
          this.isEdit = true;
          // console.log(article);
          this.defaultArticle = article;
          this.f.title.setValue(article.article.title);
          this.f.description.setValue(article.article.description);
          this.f.body.setValue(article.article.body);
          this.tagLists = article.article.tagList;
        })
      }
      })
     

  }

  addTag() {
    if(!this.f.tagList.value) {
      return;
    }
    this.enterNewTag = true;
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
    const data = {
      article: {...this.articleForm.value, tagList: this.tagLists}
    }
    if(this.slug != undefined) {
      this.articleService.updateArticle(this.slug, data)
      .subscribe((article: Article) => {
        this.route.navigate(['/article', this.slug]);
      });
    } else {
      this.articleService.addArticle(data).subscribe((article: Article) => {
      this.route.navigate(['/article', article.article.slug]);
    }); 
    }
  }
}
