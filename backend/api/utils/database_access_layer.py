from .database_client import get_db

# Events Access Layer
def get_events():
    """Fetch all events from the 'events' collection and print them."""

    # Get the database instance
    db = get_db()

    try:
        events = list(db.Events.find({}))  # 'Events' is the collection name

        # Convert ObjectId to string for JSON serialization
        for e in events:
            if "_id" in e:
                e["_id"] = str(e["_id"])

        return events
    
    except Exception as e:
        print("❌ Error fetching events:", e)

# Rewards Access Layer
def get_rewards():
    """Fetch all rewards from the 'rewards' collection and print them."""

    # Get the database instance
    db = get_db()

    try:
        rewards = list(db.Rewards.find({}))  # 'Rewards' is the collection name

        # Convert ObjectId to string for JSON serialization
        for r in rewards:
            if "_id" in r:
                r["_id"] = str(r["_id"])

        return rewards
    
    except Exception as e:
        print("❌ Error fetching rewards:", e)

