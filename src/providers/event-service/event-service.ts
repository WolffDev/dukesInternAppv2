import { SingleEventResponse } from './../../models/events/singleEventResponse.interface.ts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventsResponse } from '../../models/events/eventsResponse.interface.ts';

@Injectable()
export class EventServiceProvider {

  constructor(
    private http: HttpClient, 
  ) {

  }
  private apiEndpoint(id = '') {
    const url = `http://dukesdenmark.dk:50080/api/v1/events/${id}`;
    return url;
  }
  public getEvents() {
    return this.http.get<EventsResponse>(this.apiEndpoint()).toPromise();
  }
  // TODO: create new error res when event does exist but NO attendees, in the api
  public getEventById(id) {
    return this.http.get<SingleEventResponse>(this.apiEndpoint(id)).toPromise();
  }


}
