from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, HttpUrl
from enum import Enum

class Pages(str, Enum):
    VOLUNTEER = "volunteer"
    REWARDS = "rewards"
    PROFILE = "profile"

USER_TYPE_PAGES = {
    "volunteer": [Pages.VOLUNTEER, Pages.REWARDS, Pages.PROFILE],
    "admin": [Pages.VOLUNTEER, Pages.REWARDS],
    "organization": [Pages.PROFILE]
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
    time: datetime
    organizationLabel: str
    volunteers: List[Volunteer]
    currentState: EventState
    eventImg: Optional[str] = None

class Reward(BaseModel):
    rewardId: str
    numPoints: int
    title: str
    description: str
    rewardImg: Optional[str] = None

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

class RecommendRequest(BaseModel):
    userId: str
    appliedEventIds: List[str]

class RecommendedEvent(BaseModel):
    eventId: str
    title: str
    explanation: str

class RecommendResponse(BaseModel):
    recommendations: List[RecommendedEvent]