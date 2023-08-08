import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CommentsService, CommentApiResult } from "../../services/comments.service";
import { NewsService } from "../../services/news.service";



@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent  implements OnInit {
  commentIds: number[] = [];
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    const articleId = this.route.snapshot.paramMap.get('articleId');
    // Carica gli ID dei commenti
    this.commentsService.getCommentIds(articleId).subscribe((commentIds) => {
      this.commentIds = commentIds;
      // Per ogni ID commento, carica il dettaglio completo del commento
      commentIds.forEach(commentId => {
        this.commentsService.getComment(commentId).subscribe((comment) => {
          this.comments.push(comment);
        });
      });
    });
  }

    getCommentReplies(ids: number[]): CommentApiResult[] {
        return this.comments.filter((comment) => ids.includes(comment.id));
    }

    goToComment(commentId: number) {

    }

    /**
     loadCommentIds() {
     const articleId = this.route.snapshot.paramMap.get('id');
     this.commentsService.getCommentIds(articleId).subscribe((commentIds) => {
     this.commentIds = commentIds;
     console.log(commentIds);
     })
     }**/

    /**
     loadComments(commentIds: number[]) {
     if (commentIds){
     commentIds.forEach()
     }
     }**/

}
