import axios from 'axios';
import type GetUserRewardsResponse from '../../interfaces/api/response/GetUserRewardsResponse';
import type GetAllRewardsResponse from '../../interfaces/api/response/GetAllRewardsResponse';
import type ClaimRewardRequest from '../../interfaces/api/request/ClaimRewardRequest';

const API_BASE_URL = '/api';

export async function getUserRewards(userId: String): Promise<GetUserRewardsResponse | undefined>{
    try{
        const response = await axios.get(`${API_BASE_URL}/${userId}/rewards`)
        return response.data;
    }catch(error){
        console.error('Error', error);
    }
}
export async function getAllRewards(): Promise<GetAllRewardsResponse | undefined>{
    try{
        const response = await axios.get(`${API_BASE_URL}/rewards`)
        return response.data;
    }catch(error){
        console.error('Error', error);
    }
}
export async function redeemReward(userId: String, rewardId: String){
    try{
        const requestBody: ClaimRewardRequest = {
            rewardId: rewardId,
        };
        const response = await axios.post(`${API_BASE_URL}/${userId}/rewards/claim/`, requestBody);
        return response.data;
    }catch(error){
        console.error('Error', error);
    }
}
