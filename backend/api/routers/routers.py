from fastapi import APIRouter
from api.models.models import HealthCheckResponse, HelloResponse
router = APIRouter()

@router.get("/")
def hello_world() -> HelloResponse:
    return HelloResponse(message="Hello, World!")

@router.get("/health_check")
def health_check() -> HealthCheckResponse:
    return HealthCheckResponse(status="OK")