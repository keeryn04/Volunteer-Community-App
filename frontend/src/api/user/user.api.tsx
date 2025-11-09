import axios from 'axios';
import type LoginResponse from '../../interfaces/api/response/LoginResponse';
import type PagesResponse from '../../interfaces/api/response/PagesResponse';
import type GetUserResponse from '../../interfaces/api/response/GetUserResponse';

const API_BASE_URL = '/api';

export async function userLoginApi(username: String, password: String): Promise<LoginResponse | undefined>{
    try{
        const response = await axios.get(`${API_BASE_URL}/user/login`, {
            params: {
                username: username,
                password: password
            }
        })
        return response.data;
    }catch(error){
        console.log('Error', error);
    }
}

export async function getPagesApi(userId: String): Promise<PagesResponse|undefined>{
    try{
        const response = await axios.get(`${API_BASE_URL}/${userId}/pages`);
        return response.data;
    }catch(error){
        console.log('Error', error);
    }
}

export async function getUserDetailsApi(userId: String): Promise<GetUserResponse | undefined>{
    try{
        const response = await axios.get(`${API_BASE_URL}/${userId}`);
        return response.data;
    }catch(error){
        console.log('Error', error);
    }
}