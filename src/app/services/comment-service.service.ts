import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface ApiResult {
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private http: HttpClient) { }

  getCommentIds(articleId: number): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/item/${articleId}.json`).pipe(
      map((data: any) => data.kids)
    );
  }

  getComment(commentId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/item/${commentId}.json`);
  }

}
