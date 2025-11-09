from fastapi import FastAPI
from contextlib import asynccontextmanager
from api.routers.routers import router
from api.utils.database_client import connect_to_mongo, close_mongo_connection
from api.utils.database_access_layer import get_rewards

# Establish DB connection with lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    connect_to_mongo()
    yield
    close_mongo_connection()

# Initialize FastAPI app
app = FastAPI(lifespan=lifespan)
app.include_router(router, prefix="/api")


#Test code 
@app.get("/")
def get_health():
    return "Backend Active!"

# Test routes
@app.get("/api/test")
def get_test():
    return {"message": "test successful"}

@app.get("/api/test/{param}")
def get_test_param(param: str):
    return {"message": f"test with param: {param}"}

@app.get("/api/test_db")
def test_db_connection():
    events = get_rewards()
    return {"message": "test successful", "events": events}
