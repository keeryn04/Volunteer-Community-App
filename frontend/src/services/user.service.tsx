import { getPagesApi, userLoginApi } from "../api/user/user.api";
import type LoginResponse from "../interfaces/api/response/LoginResponse";
import type PagesResponse from "../interfaces/api/response/PagesResponse";

export async function userLogin(username: String, password: String): Promise<LoginResponse>{
    const response = await userLoginApi(username, password);
    return response || {userId: "-1"};
}
export async function getPages(userId: String): Promise<PagesResponse>{
    const response = await getPagesApi(userId);
    return response || {availablePages: []};
}