from fastapi import FastAPI
from api.routers.routers import router
app = FastAPI()

app.include_router(router)

#Test code 
@app.get("/")
def get_health():
    return "Backend Active!"