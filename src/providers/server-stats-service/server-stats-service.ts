import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ServerStatsServiceProvider {

  private url = 'http://api.dukesdenmark.dk/regamount';


  constructor(public http: HttpClient) {
  }

  getAttendeesNumber() {
    let headers = new HttpHeaders();
    headers = headers.append(`Authorization`,`${this.token}`);
    return this.http.get(this.url, {headers}).toPromise();
  }



  
}
