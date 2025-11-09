import type { UserType } from "../../User";

export default interface GetUserResponse{
    username: String,
    hours: Number,
    points: Number,
    userType: UserType
}