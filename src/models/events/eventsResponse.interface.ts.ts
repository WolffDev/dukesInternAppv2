import { SingleEvent } from "./singleEvent.interface";

export interface EventsResponse {
	newToken: string,
	events: SingleEvent[]
}