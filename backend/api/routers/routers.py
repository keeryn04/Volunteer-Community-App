from fastapi import APIRouter, HTTPException
from api.models.models import (
    EventApplyRequest,
    EventIDsResponse,
    EventResponse,
    LoginRequest,
    LoginResponse,
    PagesResponse,
    RewardClaimRequest,
    RewardsIDsResponse,
    RewardsResponse,
    USER_TYPE_PAGES,
)
import api.utils.database_access_layer as db

router = APIRouter()


# ------------------------------
# Login Routes
# ------------------------------
@router.get("/user/login", response_model=LoginResponse)
async def login_user(username: str, password: str):
    """Authenticate user credentials and return user ID if valid."""
    fetched_password, user_id = db.get_user_password_from_username(username)

    if fetched_password and password == fetched_password:
        return LoginResponse(userId=user_id)
    raise HTTPException(status_code=401, detail="Invalid credentials")


# ------------------------------
# Page Access Routes
# ------------------------------
@router.get("/{user_id}/pages", response_model=PagesResponse)
def get_user_pages(user_id: str):
    """Return available pages based on user type."""
    user_type = db.get_user_type(user_id)

    if user_type in USER_TYPE_PAGES:
        return PagesResponse(availablePages=USER_TYPE_PAGES[user_type])

    raise HTTPException(status_code=404, detail="User type not found")


# ------------------------------
# Event Routes
# ------------------------------
@router.get("/{user_id}/events", response_model=EventIDsResponse)
def get_user_events(user_id: str):
    """Return event IDs the user has joined."""
    user_event_ids = db.get_user_event_ids(user_id)
    return EventIDsResponse(appliedEventIds=user_event_ids)


@router.get("/events", response_model=EventResponse)
def get_all_events():
    """Return all events."""
    events_data = db.get_events()
    return EventResponse(events=events_data)


@router.post("/{user_id}/events/apply")
def apply_for_event(data: EventApplyRequest, user_id: str):
    """Add a volunteer to an event."""
    event_id = data.eventId
    try:
        db.add_volunteer_to_event(user_id, event_id)
        return {"message": "Volunteer successfully added to event."}
    except Exception:
        raise HTTPException(status_code=400, detail="Event Application Error")


# ------------------------------
# Reward Routes
# ------------------------------
@router.get("/{user_id}/rewards", response_model=RewardsIDsResponse)
def get_user_rewards(user_id: str):
    """Return claimed rewards and user points."""
    user_reward_ids = db.get_user_reward_ids(user_id)
    user_points = db.get_user_points(user_id)

    return RewardsIDsResponse(
        userPoints=user_points,
        claimedRewardIds=user_reward_ids,
    )


@router.get("/rewards", response_model=RewardsResponse)
def get_all_rewards():
    """Return all rewards."""
    rewards_data = db.get_rewards()
    return RewardsResponse(rewards=rewards_data)


@router.post("/{user_id}/rewards/claim")
def claim_reward(data: RewardClaimRequest, user_id: str):
    """Add a claimed reward to a user."""
    reward_id = data.rewardId
    try:
        db.add_reward_to_user(user_id, reward_id)
        return {"message": "Reward successfully claimed."}
    except Exception:
        raise HTTPException(status_code=400, detail="Reward Claim Error")
