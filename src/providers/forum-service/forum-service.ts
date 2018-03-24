import { PostCommentsResponse } from './../../models/forum/postCommentsResponse.interface';
import { SavePost } from './../../models/forum/savePost.interface';
import { PostResponse } from './../../models/forum/postResponse.interface';
import { CategoryResponse } from './../../models/forum/categoryResponse.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ForumServiceProvider {

  private _newPost: boolean;

  private categoryUrl(id = '') {
    const url = `http://dukesdenmark.dk:50080/api/v1/category/${id}`;
    return url;
  }
  private postUrl(id = '') {
    const url = `http://dukesdenmark.dk:50080/api/v1/posts?category=${+id}`;
    return url;
  }
  private postCommentsUrl(id) {
    const url = `http://dukesdenmark.dk:50080/api/v1//comment?post_id=${+id}`;
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
  saveNewPost(data) {
    return this.http.post<SavePost>(this.postUrl(), data).toPromise();
  }
  getPostComments(postId) {
    return this.http.get<PostCommentsResponse>(this.postCommentsUrl(postId)).toPromise();
  }
  set postState(data: boolean) {
    this._newPost = data;
  }
  get postState() {
    return this._newPost;
  }


}
