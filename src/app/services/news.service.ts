import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {DateUtilityService} from "./date-utility.service";

export interface NewsApiResult {
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

export interface ReadableNewsApiResult extends NewsApiResult {
  readableDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient,
    private dateService: DateUtilityService
  ) {
  }

  getTopStories(limit: number = 500): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/topstories.json?orderBy="$key"&limitToFirst=${limit}`);
  }

  getArticle(articleId: number | string | null): Observable<ReadableNewsApiResult> {
    return this.http.get<NewsApiResult>(`${environment.apiUrl}/item/${articleId}.json`).pipe(
      map((article: NewsApiResult) => {
        return {
          ...article,
          readableDate: this.dateService.convertUnixToDate(article.time)
        };
      })
    );
  }

  fromArrayToKeyValue(array: number[]): { [p: number]: number[] } {
    const keyValueMap: { [key: number]: number[] } = {};
    for (let i = 0; i < array.length; i++) {
      const key = Math.floor(i / 20) + 1; // Calcola la chiave (da 1 a 25 (20 articoli per pagina))
      if (!keyValueMap[key]) {
        keyValueMap[key] = [];
      }
      keyValueMap[key].push(array[i]);
    }
    return keyValueMap;
  }

}
