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

  getTopStories(limit: number = 500): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/topstories.json?orderBy="$key"&limitToFirst=${limit}`);
  }

  getArticle(articleId: number|string|null): Observable<any> {
    return this.http.get(`${environment.apiUrl}/item/${articleId}.json`);
  }

  convertUnixToDate(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  fromArrayToKeyValue(array: number[]): {[p: number]: number[]} {
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
