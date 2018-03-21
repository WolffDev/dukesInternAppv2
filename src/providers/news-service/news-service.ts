import { NewsResponse } from './../../models/news/newsResponse.interface';
import { AuthServiceProvider } from './../auth-service/auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NewsServiceProvider {

  private newsUrl: string = 'https://www.dukesdenmark.dk/wp-json/api/v1/news';


  constructor(private http: HttpClient, private authService: AuthServiceProvider) {
  }

  public getNews() {
    return this.http.get<NewsResponse>('http://dukesdenmark.dk:50080/api/v1/news').toPromise();
  }

  // async getSingleNews(id) {
  //   return await this.http.get(`${this.rootUrl}/${this.news}/${id}`);
  // }

}
