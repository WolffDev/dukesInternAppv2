import { NewsResponse } from './../../models/news/newsResponse.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NewsServiceProvider {

  constructor(private http: HttpClient) {
  }

  public getNews() {
    return this.http.get<NewsResponse>('http://dukesdenmark.dk:50080/api/v1/news').toPromise();
  }

}
