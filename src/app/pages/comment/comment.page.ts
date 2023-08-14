import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReadableCommentApiResult, CommentsService} from "../../services/comments.service";
import {ReadableNewsApiResult, NewsService} from "../../services/news.service";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-comment-page', // Cambia 'app-comments' a 'app-comment'
  templateUrl: 'comment.page.html',
  styleUrls: ['comment.page.scss'],
})
export class CommentPage implements OnInit {
  comment: ReadableCommentApiResult | null = null;
  parent: any = null;
  showFullText: { [commentId: string]: boolean } = {};
  maxLength: number = 150;


  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private commentService: CommentsService,
    private newsService: NewsService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const commentId = +params['commentId'];
      this.loadCommentAndReplies(commentId);
    });
  }

  async loadCommentAndReplies(commentId: number) {
    const loading = await this.loadingController.create({
      spinner: 'circular',
    });
    await loading.present();
    this.commentService.getComment(commentId).subscribe(comment => {
      this.loadArticle(comment.parent);
      this.comment = comment;
      if (this.comment.repliesCount > 0) {
        this.loadReplies(comment);
      }
      loading.dismiss();
    });
  }

  loadReplies(comment: ReadableCommentApiResult) {
    comment.replies = [];
    comment.kids.forEach(kidId => {
      this.commentService.getComment(kidId).subscribe(reply => {
        comment.replies.push(reply);
      });
    });
  }

  loadArticle(articleId: number) {
    this.newsService.getArticle(articleId).subscribe((article: any) => {
      this.parent = article;
    });
  }

  toggleText(commentId: string | number) {
    this.showFullText[commentId] = !this.showFullText[commentId];
  }

}
