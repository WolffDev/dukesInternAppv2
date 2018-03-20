import { NyhederResponse } from './../../models/nyheder/nyhederResponse.interface';
import { AuthServiceProvider } from './../auth-service/auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NyhederServiceProvider {

  private apiEndpoint: string = 'https://www.dukesdenmark.dk/wp-json/api/v1/news';


  constructor(private http: HttpClient, private authService: AuthServiceProvider) {
  }

  getNews() {
    return this.http.get<NyhederResponse>(`${this.apiEndpoint}`).toPromise();
  }

  // async getSingleNews(id) {
  //   return await this.http.get(`${this.rootUrl}/${this.news}/${id}`);
  // }

}
