from .database_client import get_db

def test_fetch_events():
    """Fetch all events from the 'events' collection and print them."""

    db = get_db()

    try:
        events = list(db.Events.find({}))  # 'Events' matches your collection name in Atlas

        for e in events:
            if "_id" in e:
                e["_id"] = str(e["_id"])

        print(f"✅ Found {len(events)} event(s):")

        for e in events:
            print(f"- {e['eventId']}: {e['title']} ({e['currentState']})")

        return events

    except Exception as e:
        print("❌ Error fetching events:", e)