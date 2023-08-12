import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NewsService, ReadableNewsApiResult } from "../../services/news.service";
import { CommentsService, ReadableCommentApiResult } from "../../services/comments.service";
import { LoadingController } from "@ionic/angular";

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
    private commentService: CommentsService,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.loadCommentDetails();
  }

    async loadCommentDetails() {
        const loading = await this.loadingController.create({
            spinner: 'circular',
        });
        await loading.present();

        const commentId = this.route.snapshot.paramMap.get('commentId');

        if (commentId) {
            this.commentService.getComment(commentId).subscribe((comment) => {
                this.comment = comment;
                this.loadArticle(comment.parent);
                this.loadReplies(comment.kids);
                loading.dismiss();
            });
        }
    }

    loadArticle(articleId: number) {
        this.newsService.getArticle(articleId).subscribe((article) => {
            this.parent = article;
        });
    }

    async loadReplies(replyIds: number[]) {
        for (const replyId of replyIds) {
            this.commentService.getComment(replyId).subscribe((reply) => {
                reply.replies = []; // Inizializza l'array di risposte nidificate per questa risposta
                this.replies.push(reply);
                this.loadNestedReplies(reply); // Carica le risposte nidificate
            });
        }
    }

    loadNestedReplies(reply: ReadableCommentApiResult) {
        if (reply.kids && reply.repliesCount > 0) {
            for (const nestedReplyId of reply.kids) {
                this.commentService.getComment(nestedReplyId).subscribe((nestedReply) => {
                    reply.replies.push(nestedReply);
                    this.loadNestedReplies(nestedReply);
                    console.log(nestedReply);
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
