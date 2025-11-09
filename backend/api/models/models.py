from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
from enum import Enum

class Pages(str, Enum):
    VOLUNTEER = "volunteer"
    REWARDS = "rewards"
    PROFILE = "profile"
    MY_EVENTS = "myEvents"
    CREATE_EVENTS = "createEvents"

USER_TYPE_PAGES = {
    "volunteer": [Pages.VOLUNTEER, Pages.REWARDS, Pages.PROFILE],
    "admin": [Pages.VOLUNTEER],
    "organization": [Pages.MY_EVENTS, Pages.CREATE_EVENTS]
}

class EventState(str, Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    DENIED = "Denied"
    COMPLETED = "Completed"

class Volunteer(BaseModel):
    userId: str
    username: str

class Event(BaseModel):
    eventId: str
    title: str
    description: str
    location: str
    time: str
    points: int
    organizationLabel: str
    volunteers: List[Volunteer]
    currentState: EventState
    eventImg: str

class Reward(BaseModel):
    rewardId: str
    numPoints: int
    title: str
    description: str
    imageURL: str

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    userId: int

class PagesResponse(BaseModel):
    availablePages: List[Pages]

class EventIDsResponse(BaseModel):
    appliedEventIds: List[str]

class EventResponse(BaseModel):
    events: List[Event]

class EventApplyRequest(BaseModel):
    eventId: str

class RewardsIDsResponse(BaseModel):
    userPoints: int
    claimedRewardIds: List[str]

class RewardsResponse(BaseModel):
    rewards: List[Reward]

class RewardClaimRequest(BaseModel):
    rewardId: str

class UserDataResponse(BaseModel):
    username: str
    hours: int
    points: int
    userType: str

class EventCreateRequest(BaseModel):
    title: str
    description: str
    location: str
    time: str
    organizationLabel: str
    eventImg: Optional[str] = None  #base64 string

class EventResponseModel(BaseModel):
    eventId: str
    title: str
    description: str
    location: str
    time: str
    organizationLabel: str
    currentState: str
    eventImg: Optional[str] = None