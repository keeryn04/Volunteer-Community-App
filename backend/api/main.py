from fastapi import FastAPI
from api.routers.routers import router
app = FastAPI()

app.include_router(router)

#Test code 
@app.get("/api/test")
def get_test():
    return "test"

#Test with parameter
@app.get("/api/test/{param}")
def get_test_param(param: str):
    return f"test with param: {param}"