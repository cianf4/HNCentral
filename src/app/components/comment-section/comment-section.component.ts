import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CommentsService } from "../../services/comments.service";
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
    private newsService: NewsService,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    this.loadComments();
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

  loadComments() {
    const articleId = this.route.snapshot.paramMap.get('id');

    // Carica gli ID dei commenti
    this.commentsService.getCommentIds(articleId).subscribe((commentIds) => {
      this.commentIds = commentIds;

      // Per ogni ID commento, carica il dettaglio completo del commento
      commentIds.forEach(commentId => {
        this.commentsService.getComment(commentId).subscribe((comment) => {
          comment.readableDate = this.newsService.convertUnixToDate(comment.time); // Utilizza la funzione del NewsService
          this.comments.push(comment);
        });
      });
    });
  }

}
