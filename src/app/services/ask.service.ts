import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DateUtilityService } from "./date-utility.service";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface AskApiResult {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  text: string;
  time: number;
  title: string;
  type: string;
}


export interface ReadableAskApiResult extends AskApiResult {
  readableDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class AskService {

  constructor(
      private http: HttpClient,
      private dateService: DateUtilityService
  ) { }

  getAskStories(limit: number = 500): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/askstories.json?orderBy="$key"&limitToFirst=${limit}`);
  }

  getAsk(askId: number | string | null): Observable<ReadableAskApiResult> {
    return this.http.get<AskApiResult>(`${environment.apiUrl}/item/${askId}.json`).pipe(
        map((ask: AskApiResult) => {
          return {
            ...ask,
            readableDate: this.dateService.convertUnixToDate(ask.time)
          };
        })
    );
  }

}
