import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventsResponse } from '../../models/events/eventsResponse.interface.ts';

@Injectable()
export class EventServiceProvider {


  constructor(
    private http: HttpClient, 
  ) {
    
  }

  public getEvents() {
    // let token = this.authService.getToken();
    // let headers = new HttpHeaders();
    // headers = headers.append(`Authorization`, `Bearer ${token}`);
    // return this.http.get<EventsResponse>(this.url, {headers}).toPromise();
    return this.http.get<EventsResponse>(this.apiEndpoint()).toPromise();
  }

  private apiEndpoint(id = '') {
    const url = `http://dukesdenmark.dk:50080/api/v1/events/${id}`;
    return url;
  }

}
