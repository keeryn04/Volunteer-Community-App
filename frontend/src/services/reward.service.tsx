import { HttpStatusCode } from "axios";
import { getAllRewardsApi, getUserRewardsApi, redeemRewardApi } from "../api/reward/reward.api";
import type GetAllRewardsResponse from "../interfaces/api/response/GetAllRewardsResponse";
import type GetUserRewardsResponse from "../interfaces/api/response/GetUserRewardsResponse";

export async function getUserRewards(userId: String): Promise<GetUserRewardsResponse>{
    const userRewards = await getUserRewardsApi(userId);
    return userRewards || {userPoints: 0, claimedRewardIds: ["0"]}
}
export async function getAllRewards(): Promise<GetAllRewardsResponse>{
    const allRewards = await getAllRewardsApi();
    return allRewards || {rewards: [
        {
            rewardId: "-1",
            numPoints: 0,
            title: "Error",
            description: "Error fetching rewards",
            imageURL: "error/image"
        }
    ]}
}
export async function redeemReward(userId: String, rewardId: String): Promise<Boolean>{
    const response = await redeemRewardApi(userId, rewardId);
    return response === HttpStatusCode.Accepted;
}