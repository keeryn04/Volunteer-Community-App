import axios from 'axios';
import type LoginResponse from '../../interfaces/api/response/LoginResponse';
import type PagesResponse from '../../interfaces/api/response/PagesResponse';

const API_BASE_URL = '/api';

export async function userLogin(username: String, password: String): Promise<LoginResponse | undefined>{
    try{
        const response = await axios.get(`${API_BASE_URL}/user/login`, {
            params: {
                username: username,
                password: password
            }
        })
        return response.data;
    }catch(error){
        console.error('Error', error);
    }
}

export async function getPages(userId: String): Promise<PagesResponse|undefined>{
    try{
        const response = await axios.get(`${API_BASE_URL}/${userId}/pages`);
        return response.data;
    }catch(error){
        console.error('Error', error);
    }
}