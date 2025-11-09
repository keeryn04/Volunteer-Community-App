import { getPagesApi, getUserDetailsApi, userLoginApi } from "../api/user/user.api";
import type GetUserResponse from "../interfaces/api/response/GetUserResponse";
import type LoginResponse from "../interfaces/api/response/LoginResponse";
import type PagesResponse from "../interfaces/api/response/PagesResponse";
import { UserType } from "../interfaces/User";

export async function userLogin(username: String, password: String): Promise<LoginResponse>{
    const response = await userLoginApi(username, password);
    return response || {userId: "-1"};
}
export async function getPages(userId: String): Promise<PagesResponse>{
    const response = await getPagesApi(userId);
    return response || {availablePages: []};
}
export async function getUserDetails(userId: String): Promise<GetUserResponse>{
    const response = await getUserDetailsApi(userId);
    return response || {username: "Error", hours: -1, points: 0, userType: UserType.Volunteer}
}