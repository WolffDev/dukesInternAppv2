import { SingleEvent } from "./singleEvent.interface";

export interface EventsResponse {
	token: string,
	events: SingleEvent[]
}