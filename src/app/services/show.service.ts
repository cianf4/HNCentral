import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DateUtilityService} from "./date-utility.service";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface ShowApiResult {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  text: string;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface ReadableShowApiResult extends ShowApiResult {
  readableDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(
      private http: HttpClient,
      private dateService: DateUtilityService
  ) { }

  getShowStories(limit: number = 500): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/showstories.json?orderBy="$key"&limitToFirst=${limit}`);
  }

  getShow(showId: number | string | null): Observable<ReadableShowApiResult> {
    return this.http.get<ShowApiResult>(`${environment.apiUrl}/item/${showId}.json`).pipe(
        map((show: ShowApiResult) => {
          return {
            ...show,
            readableDate: this.dateService.convertUnixToDate(show.time)
          };
        })
    );
  }
}
