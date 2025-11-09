import axios, { type AxiosResponse } from 'axios';
import type GetUserEventsResponse from '../../interfaces/api/response/GetUserEvents';
import type GetAllEventsResponse from '../../interfaces/api/response/GetAllEventsResponse';
import type EventApplyRequest from '../../interfaces/api/request/EventApplyRequest';


const API_BASE_URL: string = '/api'

export async function getUserEvents(userId: String): Promise<GetUserEventsResponse | undefined> {
    try{
        const response: AxiosResponse<GetUserEventsResponse> = await axios.get(`${API_BASE_URL}/${userId}/events`);
        return response.data;
    }catch(error){
        console.error('Error', error);
    }
}

export async function getAllEvents() : Promise<GetAllEventsResponse | undefined> {
    try{
        const response: AxiosResponse<GetAllEventsResponse> = await axios.get(`${API_BASE_URL}/events`);
        return response.data;
    }catch(error){
        console.error('Error', error);
    }
}

export async function applyToEvent(userId: String, eventId: String){
    try{
        const requestBody: EventApplyRequest = {
            eventId: eventId,
        };
        const response = await axios.post(`${API_BASE_URL}/${userId}/events/apply/`, requestBody);
        return response.data;
    }catch(error){
        console.error('Error', error);
    }
}