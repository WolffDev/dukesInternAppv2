import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServerStatsServiceProvider {

  private url = 'http://api.dukesdenmark.dk/regamount';
  token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZHVrZXNkZW5tYXJrLmRrIiwiaWF0IjoxNTE3MzY5ODg5LCJuYmYiOjE1MTczNjk4ODksImV4cCI6MTUxNzk3NDY4OSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMzkiLCJyb2xlcyI6WyJzdWJzY3JpYmVyIl19fX0.OQmXXSH9-feH2jiNwJ2rV8N3gDPXnpPbYqyZm18ao1k';


  constructor(public http: HttpClient) {
  }

  getAttendeesNumber() {
    let headers = new HttpHeaders();
    headers = headers.append(`Authorization`,`${this.token}`);
    return this.http.get(this.url, {headers}).toPromise();
  }



  
}
