from fastapi import FastAPI
from contextlib import asynccontextmanager
from api.routers.routers import router
from api.utils.database_client import connect_to_mongo, close_mongo_connection

# Establish DB connection with lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    connect_to_mongo()
    yield
    close_mongo_connection()

# Initialize FastAPI app
app = FastAPI(lifespan=lifespan)
app.include_router(router)

#Test code 
@app.get("/")
def get_health():
    return "Backend Active!"
