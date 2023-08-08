import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
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
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient,
              private dateService: DateUtilityService) { }

  getCommentIds(articleId: number | string | null): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/item/${articleId}.json`).pipe(
      map((data: any) => data.kids)
    );
  }

  getComment(commentId: number): Observable<ReadableCommentApiResult> {
    return this.http.get<CommentApiResult>(`${environment.apiUrl}/item/${commentId}.json`).pipe(
      map((comment: CommentApiResult) => {
        const repliesCount = Array.isArray(comment.kids) ? comment.kids.length : 0;
        return {
          ...comment,
          readableDate: this.dateService.convertUnixToDate(comment.time),
          repliesCount: repliesCount
        };
      })
    );
  }

}
