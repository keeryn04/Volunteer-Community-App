import type Event from "./Event";
import type Reward from "./Reward";

export interface User {
    username: String,
    password: String,
    userId: String,
    profilePictureURL: String,
    userType: UserType
}
export interface Volunteer extends User{
    rewards: Reward[],
    appliedEvents: Event[],
    hours: Number,
    points: Number,
}
export interface Moderator extends User{
}
export interface Organization extends User{
    organizationEvents: Event[],
}
export enum UserType{
    Volunteer = "Volunteer",
    Moderator = "Moderator",
    Organization = "Organization"
}