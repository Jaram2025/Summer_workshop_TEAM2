from typing import Optional
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException
from fastapi import Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse,JSONResponse
from app.services.gemini_service import gift_recommend  # 실제 서비스
from app.models.dto import GiftRecommendationRequest, GiftInfo, GiftRecommendationResponse

router = APIRouter()
templates = Jinja2Templates(directory="templates")

@router.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse(request, "index.html")

@router.post("/profile", response_model=GiftRecommendationResponse)
async def gift_recommendation(profile: GiftRecommendationRequest):
    try:
        giftInfo = gift_recommend(profile.birthday, profile.gender, profile.age, profile.job, profile.relationship, profile.budget_min, profile.budget_max)
        return GiftRecommendationResponse(recommendations=giftInfo)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
