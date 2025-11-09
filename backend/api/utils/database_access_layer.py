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
            e["_id"] = str(e.get("_id", ""))  # Convert ObjectId for JSON serialization
        return events
    except Exception as e:
        print("❌ Error fetching events:", e)
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
        print(f"✅ Volunteer {user_id} added to event {event_id}!")
    except Exception as e:
        print("❌ Error adding volunteer to event:", e)


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
        print("❌ Error fetching rewards:", e)
        return []


def add_reward_to_user(user_id: str, reward_id: str):
    """Add a reward to a user's record."""
    db = get_db()
    try:
        db.Users.update_one(
            {"userId": user_id},
            {"$push": {"rewards": reward_id}},
        )
        print(f"✅ Reward {reward_id} added to user {user_id}!")
    except Exception as e:
        print("❌ Error adding reward to user:", e)


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
        print("❌ Error fetching users:", e)
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
        print("❌ Error fetching user by ID:", e)
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
        print("❌ Error fetching user password:", e)
        return None, None


def get_user_type(user_id: str):
    """Fetch a user's type (e.g., volunteer, admin, organization)."""
    db = get_db()
    try:
        user = db.Users.find_one({"userId": user_id})
        return user.get("userType") if user else None
    except Exception as e:
        print("❌ Error fetching user type:", e)
        return None


def get_user_event_ids(user_id: str):
    """Fetch event IDs associated with a user."""
    db = get_db()
    try:
        user = db.Users.find_one({"userId": user_id})
        return user.get("events", []) if user else []
    except Exception as e:
        print("❌ Error fetching user event IDs:", e)
        return []


def get_user_reward_ids(user_id: str):
    """Fetch reward IDs associated with a user."""
    db = get_db()
    try:
        user = db.Users.find_one({"userId": user_id})
        return user.get("rewards", []) if user else []
    except Exception as e:
        print("❌ Error fetching user reward IDs:", e)
        return []


def get_user_points(user_id: str):
    """Fetch the user's points total."""
    db = get_db()
    try:
        user = db.Users.find_one({"userId": user_id})
        return user.get("points", 0) if user else 0
    except Exception as e:
        print("❌ Error fetching user points:", e)
        return 0
