import { PostResponse } from './../../models/forum/postResponse.interface';
import { CategoryResponse } from './../../models/forum/categoryResponse.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ForumServiceProvider {

  private categoryUrl(id = '') {
    const url = `http://dukesdenmark.dk:50080/api/v1/category/${id}`;
    return url;
  }
  private postUrl(id = '') {
    const url = `http://dukesdenmark.dk:50080/api/v1/posts?category=${+id}`;
    return url;
  }
  constructor(public http: HttpClient) {

  }

  getCategories() {
    return this.http.get<CategoryResponse>(this.categoryUrl()).toPromise();
  }
  getPostsByCategoryId(categoryId) {
    return this.http.get<PostResponse>(this.postUrl(categoryId)).toPromise();
  }

}
