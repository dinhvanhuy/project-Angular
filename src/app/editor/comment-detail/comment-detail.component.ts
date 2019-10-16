import { Component, OnInit, Input } from '@angular/core';

import { CommentService } from '../../services/comment.service';
import { Comments } from '../../models/comments';
import { Comment } from '../../models/comment';
import { ConfirmService } from 'src/app/services/confirm.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';



@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
})
export class CommentDetailComponent implements OnInit {
  public nameComment: string;
  public listComents: Array<Comment>;
  public image: string;
  public userName: string;
  public isAuth: boolean =  false;
  @Input() slug: string;

  constructor(
    private commentService: CommentService,
    public confirmService: ConfirmService,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggin
      .subscribe((status: boolean) => {
        this.isAuth = status
      })
    if (localStorage.getItem('token') == null) {
      this.isAuth = false;
    } else {
      this.isAuth = true;
    }
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
      this.commentService.input.emit(this.nameComment);
      this.getListComent();
    })
  }

  removeComments(id: number) {
    this.commentService.removeComment(this.slug, id).subscribe(() => {
      this.getListComent();
    })
  }

  inputComment() {
    this.commentService.input.emit(this.nameComment);
  }
}
