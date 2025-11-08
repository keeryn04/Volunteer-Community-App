import type { EventState } from "../enums/EventState.enum";
import type { Organization, Volunteer } from "./User";

export default interface Event{
    eventId: String,
    title: String,
    description: String,
    location: String,
    time: String,
    organization: Organization,
    volunteers: Volunteer[],
    currentState: EventState,
}