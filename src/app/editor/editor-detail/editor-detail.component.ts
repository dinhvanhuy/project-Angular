import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article';
import { ConfirmService } from 'src/app/services/confirm.service';
import { Location } from '@angular/common';

function minLength(control: FormControl) {
	if (control.value.length > 0) {
		return null;
	}
	return {
		message: true
	};
}


@Component({
	selector: 'app-editor',
	templateUrl: './editor-detail.component.html',
})
export class EditorComponent implements OnInit {
	public articleForm: FormGroup;
	private article = [];
	private isEdit = false;
	public slug: string;
	public tagLists: Array<string> = [];
	public submited = false;
	public changed: boolean;
	// Nếu ở trạng thái edit thì article sẽ được lưu vào defaultArticle để gửi sang can deactivate để check
	public defaultArticle;
	// Biến kiểm tra nếu có tag được nhập để check trong deactivate
	public enterNewTag = false;
	constructor(
		private articleService: ArticleService,
		private formBuilder: FormBuilder,
		private route: Router,
		private router: ActivatedRoute,
		public confirmService: ConfirmService,
		public location: Location
	) { }

	ngOnInit() {
		this.articleForm = this.formBuilder.group({
			title: ['', [Validators.required, minLength]],
			description: ['', [Validators.required, minLength]],
			body: ['', [Validators.required]],
			tagList: ['']
		});

		this.router.params.subscribe((params) => {
			this.slug = params.slug;
			if (this.slug !== undefined) {
				this.articleService.getArticle(this.slug)
					.subscribe((article: Article) => {
						if (article.article.author.username !== localStorage.getItem('username')) {
							this.confirmService.alert('You cannot edit this article because it\'s yours ... ');
							this.location.back();
							return;
						}
						this.isEdit = true;
						this.defaultArticle = article;
						this.f.title.setValue(article.article.title);
						this.f.description.setValue(article.article.description);
						this.f.body.setValue(article.article.body);
						this.tagLists = article.article.tagList;
					}, () => {
						this.confirmService.alert('Oops, this article does not exist ...');
						this.location.back();
					});
			}
		});

		this.articleForm.valueChanges.subscribe((changed) => {
			if (!this.isEdit && (changed.title !== '' || changed.description !== '' || changed.body !== '')) {
				this.changed = true;
			} else if (this.isEdit && (
				changed.title !== this.defaultArticle.article.title ||
				changed.description !== this.defaultArticle.article.description ||
				changed.body !== this.defaultArticle.article.body)) {
					this.changed = true;
				} else {
					this.changed = false;
				}
		});
	}

	addTag() {
		if (!this.f.tagList.value) {
			return;
		}
		this.enterNewTag = true;
		this.tagLists.push(this.f.tagList.value);
		this.f.tagList.setValue('');
	}

	removeTag(i: number) {
		this.tagLists = this.tagLists.filter((item, index) => {
			if (index !== i) {
				return item;
			}
		});
	}

	get f() {
		return this.articleForm.controls;
	}

	addArticle() {
		this.submited = true;
		if (this.articleForm.invalid) {
			return;
		}
		const data = {
			article: { ...this.articleForm.value, tagList: this.tagLists }
		};
		if (this.slug !== undefined) {
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
