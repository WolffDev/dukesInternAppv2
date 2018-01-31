import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServerStatsServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ServerStatsServiceProvider Provider');
  }

  
}
