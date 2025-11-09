from .database_client import get_db


# ------------------------------
# Event Access Layer
# ------------------------------
def get_events():
    """Fetch all events from the 'Events' collection."""
    db = get_db()
    try:
        events = list(db.Events.find({}))
        for e in events:
            e["_id"] = str(e.get("_id", ""))  #Convert ObjectId for JSON serialization
        return events
    except Exception as e:
        print("Error fetching events:", e)
        return []


def add_volunteer_to_event(user_id: str, event_id: str):
    """Add a volunteer (user) to an event."""
    db = get_db()
    try:
        user = db.Users.find_one({"userId": user_id})
        if not user:
            raise ValueError("User not found.")

        username = user.get("username")
        db.Events.update_one(
            {"eventId": event_id},
            {"$push": {"volunteers": {"userId": user_id, "username": username}}},
        )
        print(f"Volunteer {user_id} added to event {event_id}!")
    except Exception as e:
        print("Error adding volunteer to event:", e)

def set_event_status(event_id: str, status: str):
    db = get_db()
    try:
        result = db.Events.update_one(
            {"eventId": event_id},
            {"$set": {"currentState": status}}
        )
        if result.matched_count == 0:
            print(f"No event found with ID {event_id}")
            return False
        print(f"Event {event_id} set to {status}!")
        return True
    except Exception as e:
        print("Error updating event status:", e)
        return False
    
def create_event(event_data: dict):
    """
    Insert a new event into the database.
    """

    db = get_db()
    try:
        db.Events.insert_one(event_data)
        print(f"Event {event_data['eventId']} created successfully!")
        return event_data
    except Exception as e:
        print("Error creating event:", e)
        return None
    
def approve_event(event_id: str, points: int) -> bool:
    """
    Approve an event and set its point value.
    Returns True if the update succeeded, False otherwise.
    """
    db = get_db()
    try:
        result = db.Events.update_one(
            {"eventId": event_id},
            {"$set": {"currentState": "Approved", "points": points}}
        )
        return result.modified_count > 0
    except Exception as e:
        print(f"Error approving event {event_id}: {e}")
        return False

# ------------------------------
# Reward Access Layer
# ------------------------------
def get_rewards():
    """Fetch all rewards from the 'Rewards' collection."""
    db = get_db()
    try:
        rewards = list(db.Rewards.find({}))
        for r in rewards:
            r["_id"] = str(r.get("_id", ""))
        return rewards
    except Exception as e:
        print("Error fetching rewards:", e)
        return []


def add_reward_to_user(user_id: str, reward_id: str):
    """Add a reward to a user's record and deduct points."""
    db = get_db()
    try:
        #fetch reward to get point amount
        reward = db.Rewards.find_one({"rewardId": reward_id})
        if not reward:
            print(f"Reward {reward_id} not found!")
            return {"success": False, "message": "Reward not found."}

        reward_points = reward.get("numPoints", 0)

        #fetch user
        user = db.Users.find_one({"userId": user_id})
        if not user:
            print(f"User {user_id} not found!")
            return {"success": False, "message": "User not found."}

        if user.get("points", 0) < reward_points:
            print(f"User {user_id} does not have enough points!")
            return {"success": False, "message": "Insufficient points."}

        #update user and points
        db.Users.update_one(
            {"userId": user_id},
            {
                "$push": {"rewards": reward_id},
                "$inc": {"points": -reward_points}
            },
        )

        print(f"Reward {reward_id} added to user {user_id} and {reward_points} points deducted!")
        return {"success": True, "message": "Reward redeemed successfully."}

    except Exception as e:
        print("Error adding reward to user:", e)
        return {"success": False, "message": str(e)}

# ------------------------------
# User Access Layer
# ------------------------------
def get_users():
    """Fetch all users from the 'Users' collection."""
    db = get_db()
    try:
        users = list(db.Users.find({}))
        for u in users:
            u["_id"] = str(u.get("_id", ""))
        return users
    except Exception as e:
        print("Error fetching users:", e)
        return []


def get_user_by_id(user_id: str):
    """Fetch user details by ID."""
    db = get_db()
    try:
        user = db.Users.find_one({"userId": user_id})
        if user:
            user["_id"] = str(user.get("_id", ""))
        return user
    except Exception as e:
        print("Error fetching user by ID:", e)
        return None


def get_user_password_from_username(username: str):
    """Fetch a user's password and ID by username."""
    db = get_db()
    try:
        user = db.Users.find_one({"username": username})
        if user:
            return user.get("password"), user.get("userId")
        return None, None
    except Exception as e:
        print("Error fetching user password:", e)
        return None, None


def get_user_type(user_id: str):
    """Fetch a user's type (e.g., volunteer, admin, organization)."""
    db = get_db()
    try:
        user = db.Users.find_one({"userId": user_id})
        return user.get("userType") if user else None
    except Exception as e:
        print("Error fetching user type:", e)
        return None


def get_user_event_ids(user_id: str):
    """Fetch event IDs associated with a user."""
    db = get_db()
    try:
        user = db.Users.find_one({"userId": user_id})
        return user.get("events", []) if user else []
    except Exception as e:
        print("Error fetching user event IDs:", e)
        return []


def get_user_reward_ids(user_id: str):
    """Fetch reward IDs associated with a user."""
    db = get_db()
    try:
        user = db.Users.find_one({"userId": user_id})
        return user.get("rewards", []) if user else []
    except Exception as e:
        print("Error fetching user reward IDs:", e)
        return []


def get_user_points(user_id: str):
    """Fetch the user's points total."""
    db = get_db()
    try:
        user = db.Users.find_one({"userId": user_id})
        return user.get("points", 0) if user else 0
    except Exception as e:
        print("Error fetching user points:", e)
        return 0
    
def get_username(user_id: str):
    db = get_db()
    try:
        user = db.Users.find_one({"userId": user_id})
        return user.get("username", "") if user else ""
    except Exception as e:
        print("Error fetching user organization label:", e)
        return 0
    
def add_points_to_user(user_id: str, points: int):
    db = get_db()
    try:
        result = db.Users.update_one(
            {"userId": user_id},
            {"$inc": {"points": points}}
        )
        return result.modified_count > 0
    except Exception as e:
        print(f"Error adding points to user {user_id}: {e}")
        return False