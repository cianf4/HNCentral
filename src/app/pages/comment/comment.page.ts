import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {NewsService, ReadableNewsApiResult} from "../../services/news.service";
import {CommentsService, ReadableCommentApiResult} from "../../services/comments.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {
  comment: ReadableCommentApiResult | null = null;
  commentId: string | null = this.route.snapshot.paramMap.get('commentId');
  parent: ReadableNewsApiResult | null = null;
  replies: ReadableCommentApiResult[] = [];


  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private commentService: CommentsService
  ) { }

  ngOnInit() {
    this.loadCommentDetails();
  }

  loadCommentDetails() {
    this.commentService.getComment(this.commentId).subscribe((comment) => {
      this.comment = comment;
      this.loadArticle(comment.parent);
      if (comment.kids && comment.kids.length > 0) {
        this.loadReplies(comment.kids);
      }
    });
  }

  loadArticle(articleId: number) {
    this.newsService.getArticle(articleId).subscribe((article) => {
      this.parent = article;
    });
  }

  loadReplies(replyIds: number[]) {
    for (const replyId of replyIds) {
      this.commentService.getComment(replyId).subscribe((reply) => {
        this.replies.push(reply);
        console.log(reply);
      });
    }
  }



  /**
  loadComment() {
    this.commentService.getComment(this.commentId).subscribe((comment) => {
      this.comment = comment;
      console.log(comment)
    })
  }

  loadParent() {
    this.newsService.getArticle(this.comment.parent).subscribe((article) => {
      this.parent = article;
      console.log(article);
    });
  }
**/
}
