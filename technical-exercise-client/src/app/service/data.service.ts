import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { catchError, map, retry } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Client } from "../shared/client";
import { Rule } from "../shared/rule";

@Injectable()
export class DataService {
  private httpStatusCode = new BehaviorSubject<any>("");
  statusCode = this.httpStatusCode.asObservable();

  private clientIdSource$ = new BehaviorSubject<string>("Default app");
  clientIdMessage = this.clientIdSource$.asObservable();

  constructor(private httpClient: HttpClient) {}

  getClient(serarchTerm?: string) {
    return this.httpClient
      .get(`${environment.apiUrl}/api/Clients?searchQuery=${serarchTerm}`)
      .pipe(
        retry(3),
        map(res => res as Client),
        catchError(c => this.handleError(c))
      );
  }

  getRules(id: string) {
    return this.httpClient
      .get(`${environment.apiUrl}/api/Clients/${id}`)
      .pipe(
        retry(3),
        map(res => res as Rule[]),
        catchError(c => this.handleError(c))
      );
  }

  changeMessage(message: string) {
    this.clientIdSource$.next(message);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
      this.httpStatusCode.next(error.status);
    }
    return new ErrorObservable(
      "Something bad happened; please try again later."
    );
  }
}
