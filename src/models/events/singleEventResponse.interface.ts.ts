import { Attendee } from './attendee.interface';
export interface SingleEventResponse {
	token: string,
	attendeeAmount: number,
	attendees: Attendee[]
}