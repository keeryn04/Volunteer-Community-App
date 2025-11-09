from .database_client import db

# Example: "volunteers" collection CRUD
def get_all_volunteers():
    """Fetch all volunteer documents."""
    volunteers = list(db.volunteers.find({}))
    return volunteers

def add_volunteer(volunteer_data: dict):
    """Insert a new volunteer document."""
    result = db.volunteers.insert_one(volunteer_data)
    return {"inserted_id": str(result.inserted_id)}

def delete_volunteer(volunteer_id):
    """Delete a volunteer by ID."""
    from bson import ObjectId
    result = db.volunteers.delete_one({"_id": ObjectId(volunteer_id)})
    return {"deleted_count": result.deleted_count}
