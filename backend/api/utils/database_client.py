from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os

client = None
db = None

def connect_to_mongo():
    """Initialize MongoDB connection."""
    global client, db
    load_dotenv()
    uri = os.getenv("MONGODB_URI")
    db_name = os.getenv("DB_NAME")

    try:
        client = MongoClient(uri, server_api=ServerApi("1"))
        client.admin.command("ping")
        db = client[db_name]
        print("✅ Connected to MongoDB!")
    except Exception as e:
        print("❌ MongoDB connection failed:", e)

def close_mongo_connection():
    """Close MongoDB connection."""
    global client
    if client:
        client.close()
        print("🛑 MongoDB connection closed.")
