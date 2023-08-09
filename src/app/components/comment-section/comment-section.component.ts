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
  commentIdsLength: number = 0;
  comments: any[] = [];
  articleId = this.route.snapshot.paramMap.get('articleId');

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    this.loadComments();
  }

  loadComments() {
    //const articleId = this.route.snapshot.paramMap.get('articleId');
    this.commentsService.getCommentIds(this.articleId).subscribe((commentIds) => {
      this.commentIds = commentIds;
      this.commentIdsLength = commentIds?.length ?? 0;
      if (this.commentIdsLength > 0) {
        commentIds.forEach(commentId => {
          this.commentsService.getComment(commentId).subscribe((comment) => {
            this.comments.push(comment);
          });
        });
      }
    });
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
