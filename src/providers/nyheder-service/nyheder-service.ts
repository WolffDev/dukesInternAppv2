import { AuthServiceProvider } from './../auth-service/auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NyhederServiceProvider {

  url: string = 'https://www.dukesdenmark.dk/wp-json/api/v1/news';


  constructor(private http: HttpClient, private authService: AuthServiceProvider) {
  }

  getNews() {
    // let headers = new HttpHeaders();
    // headers = headers.append(`Authorization`,`${this.token}`);
    // return this.http.get(`${this.url}`, {headers});
  }

  // async getSingleNews(id) {
  //   return await this.http.get(`${this.rootUrl}/${this.news}/${id}`);
  // }

}
