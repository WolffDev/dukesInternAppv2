import { Attendee } from './attendee.interface';
export interface SingleEventResponse {
	newtoken: string,
	attendeeAmount: number,
	attendees: Attendee[]
}