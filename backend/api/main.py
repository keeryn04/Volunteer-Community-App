from fastapi import FastAPI
from api.routers.routers import router
app = FastAPI()

app.include_router(router)

#Test code 
@app.get("/api/test")
def get_test():
    return "test"