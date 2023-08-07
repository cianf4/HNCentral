import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface ApiResult {
  by: string;
  descendants: number | null;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getTopStories(limit: number = 20): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/topstories.json?orderBy="$key"&limitToFirst=${limit}`);
  }

  getArticle(articleId: number): Observable<any> {
    const url = `${environment.apiUrl}/item/${articleId}.json`;
    return this.http.get(url);
  }
}
