import base64
import os
import requests
import google.generativeai as genai
from typing import Optional
from fastapi import APIRouter, HTTPException
from api.models.models import (
    EventApplyRequest,
    EventCreateRequest,
    EventIDsResponse,
    EventResponse,
    EventResponseModel,
    LoginResponse,
    PagesResponse,
    RewardClaimRequest,
    RewardsIDsResponse,
    RewardsResponse,
    USER_TYPE_PAGES,
    UserDataResponse,
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
def get_all_events(user_id: str):
    """Return filtered events based on user type and status."""
    all_events = db.get_events()
    user_type = db.get_user_type(user_id)

    #filter events based on user type
    if user_type == "admin":
        filtered_events = all_events  #admin sees all events
    elif user_type == "organization":
        user_event_ids = db.get_user_event_ids(user_id) #org sees only theirs
        filtered_events = [
            e for e in all_events
            if e.get("eventId") in user_event_ids and e.get("currentState") in ["Approved", "Completed"]
        ]
    else:  #volunteer user
        filtered_events = [
            e for e in all_events
            if e.get("currentState") in ["Approved", "Completed"]
        ]
    
    events_data = []
    for event in filtered_events:
        image_url = event.get("eventImg", "") #direct http reference

        events_data.append({
            "eventId": event.get("eventId", ""),
            "title": event.get("title", ""),
            "description": event.get("description", ""),
            "location": event.get("location", ""),
            "time": event.get("time", ""),
            "points": event.get("points", 0),
            "organizationLabel": event.get("organizationLabel", ""),
            "volunteers": event.get("volunteers", []),
            "currentState": event.get("currentState", ""),
            "eventImg": image_url
        })

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
    
@router.get("/{event_id}/events/complete")
def set_event_complete(event_id: str):
    """Set a event as complete."""
    try:
        db.set_event_status(event_id, "Completed")
        return {"message": "Event successfully set to complete."}
    except Exception:
        raise HTTPException(status_code=400, detail="Event Completion Error")
    
@router.post("/{user_id}/events/create", response_model=EventResponseModel)
def create_event_route(event: EventCreateRequest, user_id: str):

    organization_label = db.get_username(user_id)
    if not organization_label:
        raise HTTPException(status_code=404, detail="Organization not found for user")
    
    #Generate a unique eventId
    event_id = str(db.Events.count_documents({}) + 1)

    event_doc = {
        "eventId": event_id,
        "title": event.title,
        "description": event.description,
        "location": event.location,
        "time": event.time,
        "points": 0,
        "organizationLabel": organization_label,
        "volunteers": [],
        "currentState": "Pending",
        "eventImg": event.eventImg,
    }

    created = db.create_event(event_doc)
    if not created:
        raise HTTPException(status_code=500, detail="Failed to create event")

    return created

@router.post("/{event_id}/events/approve")
def approve_event_route(event_id: str, points: int):
    """Route to approve an event and assign points."""
    success = db.approve_event(event_id, points)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to approve event")
    return {"message": f"Event {event_id} approved with {points} points."}

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

@router.get("/{user_id}/rewards/claim")
def claim_reward(rewardId: str, user_id: str):
    """Add a claimed reward to a user."""
    reward_id = rewardId
    try:
        response = db.add_reward_to_user(user_id, reward_id)
        return response
    except Exception:
        raise HTTPException(status_code=400, detail="Reward Claim Error")

# ------------------------------
# User Routes
# ------------------------------
@router.get("/{user_id}")
def get_user(user_id: str):
    """Get user's stats based on ID"""

    user = db.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserDataResponse(
        username=user.get("username", ""),
        hours=user.get("hours", 0),
        points=user.get("points", 0),
        userType=user.get("userType", "")
    )

@router.get("/{user_id}/points")
def add_user_points(user_id: str, points: int):
    """Add points to user"""

    db.add_points_to_user(user_id, points)
    
    return {"message": f"{points} points added to user {user_id}"}