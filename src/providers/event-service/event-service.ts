import { AuthServiceProvider } from './../auth-service/auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface SingleEvent {
  event: string,
  id: number,
  time_from: string,
  time_to: string
}

interface EventsResponse {
  newToken: string,
  events: SingleEvent[]
}

@Injectable()
export class EventServiceProvider {

  private url = 'http://dukesdenmark.dk:50080/api/v1/events';

  constructor(public http: HttpClient, private authService: AuthServiceProvider) {

  }

  public getEvents() {
    // let token = this.authService.getToken();
    // let headers = new HttpHeaders();
    // headers = headers.append(`Authorization`, `Bearer ${token}`);
    // return this.http.get<EventsResponse>(this.url, {headers}).toPromise();
    return this.http.get<EventsResponse>(this.url).toPromise();
  }

}
