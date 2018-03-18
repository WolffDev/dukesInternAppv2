import { Attendee } from './Attendee';
export interface SingleEventResponse {
	newtoken: string,
	attendeeAmount: number,
	attendees: Attendee[]
}