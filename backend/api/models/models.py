from pydantic import BaseModel

class HelloResponse(BaseModel):
    message: str

class HealthCheckResponse(BaseModel):
    status: str