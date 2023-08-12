import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin, map, mergeMap, of } from "rxjs";
import { environment } from "../../environments/environment";
import { DateUtilityService } from "./date-utility.service";


export interface CommentApiResult {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}

export interface ReadableCommentApiResult extends CommentApiResult {
  readableDate: string;
  repliesCount: number;
  replies: ReadableCommentApiResult[];
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private http: HttpClient,
    private dateService: DateUtilityService,
  ) { }

  getCommentIds(articleId: number | string | null): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/item/${articleId}.json`).pipe(
      map((data: any) => data.kids)
    );
  }

  getComment(commentId: number | string | null): Observable<ReadableCommentApiResult> {
    return this.http.get<CommentApiResult>(`${environment.apiUrl}/item/${commentId}.json`).pipe(
        mergeMap((comment: CommentApiResult) => {
          const repliesCount = Array.isArray(comment.kids) ? comment.kids.length : 0;
          const readableComment: ReadableCommentApiResult = {
            ...comment,
            readableDate: this.dateService.convertUnixToDate(comment.time),
            repliesCount: repliesCount,
            replies: []
          };
          if (repliesCount > 0) {
            const repliesObservableArray: Observable<ReadableCommentApiResult>[] = [];
            for (const replyId of comment.kids) {
              repliesObservableArray.push(this.getComment(replyId));
            }
            return forkJoin(repliesObservableArray).pipe(
                map((replies: ReadableCommentApiResult[]) => {
                  readableComment.replies = replies;
                  return readableComment;
                })
            );
          } else {
            return of(readableComment);
          }
        })
    );
  }

}
