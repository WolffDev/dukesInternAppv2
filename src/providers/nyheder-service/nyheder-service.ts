import { AuthServiceProvider } from './../auth-service/auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NyhederServiceProvider {

  url: string = 'https://www.dukesdenmark.dk/wp-json/api/v1/news';
  token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZHVrZXNkZW5tYXJrLmRrIiwiaWF0IjoxNTE3MzY5ODg5LCJuYmYiOjE1MTczNjk4ODksImV4cCI6MTUxNzk3NDY4OSwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMzkiLCJyb2xlcyI6WyJzdWJzY3JpYmVyIl19fX0.OQmXXSH9-feH2jiNwJ2rV8N3gDPXnpPbYqyZm18ao1k';


  constructor(private http: HttpClient, private authService: AuthServiceProvider) {
    console.log(this.token);
  }

  getNews() {
    // console.log(this.token);
    // let headers = new HttpHeaders();
    // headers = headers.append(`Authorization`,`${this.token}`);
    // return this.http.get(`${this.url}`, {headers});
  }

  // async getSingleNews(id) {
  //   return await this.http.get(`${this.rootUrl}/${this.news}/${id}`);
  // }

}
