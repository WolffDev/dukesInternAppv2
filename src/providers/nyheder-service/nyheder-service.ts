import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NyhederServiceProvider {

  rootUrl: string = '';
  posts: string = 'posts';


  constructor(public http: HttpClient) {
    console.log('Hello NyhederServiceProvider Provider');
  }

  async getNews() {
    return await this.http.get(`${this.rootUrl}/${this.posts}`);
  }

  async getSingleNews(id) {
    return await this.http.get(`${this.rootUrl}/${this.posts}/${id}`);
  }

}
