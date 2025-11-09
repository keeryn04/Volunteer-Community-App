import type { EventState } from "../enums/EventState.enum";

export default interface Event{
    eventId: String,
    title: String,
    description: String,
    location: String,
    time: String,
    organizationLabel: String,
    volunteers: VolunteerDto[],
    currentState: EventState,
    eventImg: String
}

export interface VolunteerDto{
    userId: String,
    username: String
}