import { SingleEvent } from "./SingleEvent";

export interface EventsResponse {
	newToken: string,
	events: SingleEvent[]
}