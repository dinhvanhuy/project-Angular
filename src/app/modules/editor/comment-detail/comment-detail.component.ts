import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
})
export class CommentDetailComponent implements OnInit {
	public nameComment:string;
	private listComents:array = [];
	@Input() slug: string;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  	this.getListComent();
  }

  getListComent() {
  	this.commentService.getComment(this.slug)
  	.subscribe(({comments}) => {
  		this.listComents = comments;
  	});
  }

  addComments() {
  	const data = {
  		comment:{
  			body: this.nameComment
  		}
  	}
  	if(!this.nameComment) {
  		return;
  	}
  	this.commentService.addComment(this.slug, data).subscribe(({comments}) => {
  		this.nameComment = '';
  		this.getListComent();
  	}) 
  }

  removeComments(id: number) {
  	this.commentService.removeComment(this.slug, id).subscribe(() => {
  		this.getListComent();
  	})
  }

}
