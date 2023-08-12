import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReadableCommentApiResult, CommentsService } from "../../services/comments.service";
import { ReadableNewsApiResult, NewsService } from "../../services/news.service";

@Component({
    selector: 'app-comment-page', // Cambia 'app-comments' a 'app-comment'
    templateUrl: 'comment.page.html',
    styleUrls: ['comment.page.scss'],
})
export class CommentPage implements OnInit {
    comment: ReadableCommentApiResult | null = null;
    parent: ReadableNewsApiResult | null = null;


    constructor(
        private route: ActivatedRoute,
        private commentService: CommentsService,
        private newsService: NewsService
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const commentId = +params['commentId'];
            this.loadCommentAndReplies(commentId);
        });
    }

    loadCommentAndReplies(commentId: number) {
        this.commentService.getComment(commentId).subscribe(comment => {
            this.loadArticle(comment.parent);
            this.comment = comment;
            this.loadReplies(comment);
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
        this.newsService.getArticle(articleId).subscribe((article) => {
            this.parent = article;
        });
    }

}
