import { HttpStatusCode } from "axios";
import { applyToEventApi, getAllEventsApi, getUserEventsApi } from "../api/event/event.api";
import { EventState } from "../enums/EventState.enum";
import type GetAllEventsResponse from "../interfaces/api/response/GetAllEventsResponse";
import type GetUserEventsResponse from "../interfaces/api/response/GetUserEvents";

export async function getUserEvents(userId: String): Promise<GetUserEventsResponse>{
    const userEventIds = await getUserEventsApi(userId);
    return userEventIds || {"appliedEventIds": []}
}
export async function getAllEvents(userId: String): Promise<GetAllEventsResponse>{
    const allEvents = await getAllEventsApi(userId);
    return allEvents || {events: [{
        eventId: '-1',
        title: 'Error',
        description: 'Event Data is undefined',
        location: 'N/A',
        time: 'N/A',
        organizationLabel: 'Error',
        volunteers: [
            {
                userId: '-1',
                username: 'Error'
            }
        ],
        currentState: EventState.DENIED,
    }]}
}
export async function applyToEvent(userId: String, eventId: String): Promise<boolean>{
    const applyResponse = await applyToEventApi(userId, eventId);
    return applyResponse === HttpStatusCode.Ok
}