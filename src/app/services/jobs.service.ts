import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DateUtilityService} from "./date-utility.service";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface JobsApiResult {
  by: string;
  id: number;
  score: number;
  text: string;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface ReadableJobsApiResult extends JobsApiResult {
  readableDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(
      private http: HttpClient,
      private dateService: DateUtilityService
  ) { }

  getJobsStories(limit: number = 500): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/jobstories.json?orderBy="$key"&limitToFirst=${limit}`);
  }

  getJob(jobId: number | string | null): Observable<ReadableJobsApiResult> {
    return this.http.get<JobsApiResult>(`${environment.apiUrl}/item/${jobId}.json`).pipe(
        map((job: JobsApiResult) => {
          return {
            ...job,
            readableDate: this.dateService.convertUnixToDate(job.time)
          };
        })
    );
  }

}
