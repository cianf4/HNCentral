import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CommentsService } from "../../services/comments.service";

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss'],
})
export class CommentSectionComponent  implements OnInit {
  commentIds: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    this.loadCommentsIds();
  }

  loadCommentsIds() {
    const articleId = this.route.snapshot.paramMap.get('id');
    this.commentsService.getCommentIds(articleId).subscribe((commentIds) => {
      this.commentIds = commentIds;
      console.log(commentIds);
    })
  }

}
