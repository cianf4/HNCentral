import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {AskApiResult} from "./ask.service";
import {DateUtilityService} from "./date-utility.service";


export interface UserApiResult {
  about: string;
  created: number;
  delay: number;
  id: string;
  karma: number;
  submitted: number[];
}

export interface ReadableUserApiResult extends UserApiResult {
  readableDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private dateService: DateUtilityService
  ) { }

  getUser(userId: string | null): Observable<ReadableUserApiResult> {
    return this.http.get<UserApiResult>(`${environment.apiUrl}/user/${userId}.json`).pipe(
      map((user: UserApiResult) => {
        return {
          ...user,
          readableDate: this.dateService.convertUnixToDate(user.created)
        };
      })
    );  }

}
