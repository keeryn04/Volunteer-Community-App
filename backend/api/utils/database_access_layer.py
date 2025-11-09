from .database_client import get_db

def test_fetch_events():
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