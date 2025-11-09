import type Event from "./Event";

export interface User {
    username: String,
    password: String,
    userId: String,
    profilePictureURL: String,
    userType: UserType
}
export interface Volunteer extends User{
    claimedRewardIds: String[],
    appliedEventIds: String[],
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