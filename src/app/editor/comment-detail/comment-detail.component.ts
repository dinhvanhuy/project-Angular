import { Component, OnInit, Input } from '@angular/core';

import { CommentService } from '../../services/comment.service';
import { Comments } from '../../models/comments';
import { Comment } from '../../models/comment';



@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
})
export class CommentDetailComponent implements OnInit {
  public nameComment: string;
  public listComents: Array<Comment>;
  public image: string;
  public userName: string;
  @Input() slug: string;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.getListComent();
  }

  getListComent() {
    this.commentService.getComment(this.slug)
      .subscribe((comments: Comments) => {
        this.listComents = comments.comments;
      });
    this.image = localStorage.getItem('image');
    this.userName = localStorage.getItem('username');
  }

  addComments() {
    const data = {
      comment: {
        body: this.nameComment
      }
    }
    if (!this.nameComment) {
      return;
    }
    this.commentService.addComment(this.slug, data).subscribe(() => {
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
