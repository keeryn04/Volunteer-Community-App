from fastapi import APIRouter, HTTPException
from api.models.models import EventApplyRequest, EventIDsResponse, EventResponse, LoginRequest, LoginResponse, PagesResponse, RewardClaimRequest, RewardsIDsResponse, RewardsResponse
from api.models.models import USER_TYPE_PAGES
router = APIRouter()

#login routes
@router.get("/user/login", response_model=LoginResponse)
async def login_response(username: str, password: str):
    #database call
    fetched_username = "JohnDoe123"
    fetched_password = "password"

    if username == fetched_username and password == fetched_password:
        user_id = 1
        return LoginResponse(userId=user_id)
    
    raise HTTPException(status_code=401, detail="Invalid credentials")

#pages routes
@router.get("/{user_id}/pages", response_model=PagesResponse)
def pages_response(user_id: str): 
    #fetch user type based on ID
    user_type = get_user_type(user_id)
    if user_type == "volunteer":
        return PagesResponse(availablePages=USER_TYPE_PAGES["volunteer"])
    elif user_type == "admin":
        return PagesResponse(availablePages=USER_TYPE_PAGES["admin"])
    elif user_type == "organization":
        return PagesResponse(availablePages=USER_TYPE_PAGES["organization"])
    
#event routes
@router.get("/{user_id}/events", response_model=EventIDsResponse)
def volunteer_event_response(user_id: str):
    user_event_ids = get_user_event_ids(user_id)
    return EventResponse(appliedEventIds=user_event_ids)
         
@router.get("/events", response_model=EventResponse)
def event_response():
    #database call to get all events
    events_data = [{
            "eventId": "0",
            "title": "Community Clean-Up",
            "description": "Join us to help clean up the local park and surrounding areas.",
            "location": "Riverside Park",
            "time": "2025-11-10T09:00:00",
            "organizationLabel": "GreenFuture Org",
            "volunteers": [
                {"userId": "1", "username": "alex"},
                {"userId": "2", "username": "jordan"}
            ],
            "currentState": "Pending"
        },
        {
            "eventId": "1",
            "title": "Food Bank Drive",
            "description": "Help collect and organize food donations for families in need.",
            "location": "Downtown Community Center",
            "time": "2025-11-15T13:30:00",
            "organizationLabel": "Helping Hands",
            "volunteers": [
                {"userId": "3", "username": "robert"},
                {"userId": "2", "username": "jordan"}
            ],
            "currentState": "Approved"
        }
    ]

    return EventResponse(events=events_data)

@router.post("/{user_id}/events/apply")
def create_event_apply(data: EventApplyRequest, user_id: str):
    #database update, event update between volunteer and event using user_id and event_id
    #want to add user_id to list of volunteers tied to that event, so add volunteer with userId and username to list of volunteers in event
    #
    #{"userId": "2", "username": "robert"} <-- add this to event 3 if robert signed up for event 3
    #
    event_id = data.eventId
    successful = True

    if (successful):
        raise HTTPException(status_code=200)
    else:
        raise HTTPException(status_code=400, detail="Reward Claim Error")
    
#rewards routes
@router.get("/{user_id}/rewards", response_model=RewardsIDsResponse)
def get_volunteer_rewards(user_id: str):
    user_rewards_details = get_user_rewards_ids(user_id)
    user_points, user_rewards_ids = user_rewards_details

    return RewardsIDsResponse(
        userPoints=user_points,
        claimedRewardIds=user_rewards_ids
    )

@router.get("/rewards", response_model=RewardsResponse)
def get_volunteer_rewards():
    #database call to get all rewards
    rewards_data = [
        {
            "rewardId": "0",
            "numPoints": 50,
            "title": "Free Coffee Voucher",
            "description": "Enjoy a free medium coffee from BeanWorks CafÃ©.",
            "imageURL": "https://example.com/images/coffee.png"
        },
        {
            "rewardId": "1",
            "numPoints": 100,
            "title": "Movie Ticket",
            "description": "Redeem a single movie pass at CineMax Theatres.",
            "imageURL": "https://example.com/images/movie-ticket.png"
        }]

    return RewardsResponse(rewards=rewards_data)

@router.post("/{user_id}/rewards/claim")
def create_reward_claim(data: RewardClaimRequest, user_id: str):
    #database update, reward update between volunteer and reward using user_id and reward_id
    #want to add reward_id to list of volunteer's rewards, so add reward to rewards list of user
    #
    #{"rewardId": "3"} <-- add this to robert (userId 2) to say he has 'claimed' reward 3
    #
    reward_id = data.rewardId
    successful = True

    if (successful):
        raise HTTPException(status_code=200)
    else:
        raise HTTPException(status_code=400, detail="Event Application Error")

def get_user_type(user_id: str):
    #database call for user type, return the users type from userType
    if (user_id == "1"):
        user_type = "admin"
    
    return user_type

def get_user_event_ids(user_id: str):
    #database call for user events based on id, return list of eventIds based on the userId associated
    if (user_id == "1"):
        user_events = ["0", "2", "3"]
    
    return user_events

def get_user_rewards_ids(user_id: str):
    #database call for reward ids and user points based on user id, return list of rewardIds and the user's points based on the userId associated
    if (user_id == "1"):
        user_points = 200
        user_rewards = ["1", "2", "3"]
    
    return [user_points, user_rewards]