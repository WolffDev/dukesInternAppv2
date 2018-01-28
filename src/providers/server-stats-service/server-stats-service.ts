import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

/*
  Generated class for the ServerStatsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerStatsServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ServerStatsServiceProvider Provider');
  }

  async getAttendess() {
    let apiUrl = 'https://jsonplaceholder.typicode.com/posts/1/comments';
    return await this.http.get(apiUrl);
  }
  
}
