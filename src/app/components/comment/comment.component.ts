import { Component, Input } from '@angular/core';
import {ReadableCommentApiResult} from "../../services/comments.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comments: ReadableCommentApiResult[] = [];
}
