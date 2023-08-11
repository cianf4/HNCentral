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
    const commentId = this.route.snapshot.paramMap.get('commentId');
    if (commentId) {
      this.commentService.getComment(commentId).subscribe((comment) => {
        this.comment = comment;
        this.loadArticle(comment.parent);
        this.loadReplies(comment.kids); // Carica le risposte dirette al commento principale
        for (const reply of this.comment.replies) {
          this.loadNestedReplies(reply); // Carica tutte le risposte nidificate
          console.log(reply);
        }
      });
    }
  }


  loadArticle(articleId: number) {
    this.newsService.getArticle(articleId).subscribe((article) => {
      this.parent = article;
    });
  }

  loadReplies(replyIds: number[]) {
    for (const replyId of replyIds) {
      this.commentService.getComment(replyId).subscribe((reply) => {
        reply.replies = []; // Inizializza l'array di risposte nidificate per questa risposta
        this.replies.push(reply);
        this.loadNestedReplies(reply); // Carica le risposte nidificate
      });
    }
  }

  loadNestedReplies(reply: ReadableCommentApiResult) {
    if (reply.kids && reply.kids.length > 0) {
      for (const nestedReplyId of reply.kids) {
        this.commentService.getComment(nestedReplyId).subscribe((nestedReply) => {
          reply.replies.push(nestedReply);
          this.loadNestedReplies(nestedReply); // Carica ulteriori risposte nidificate
        });
      }
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
