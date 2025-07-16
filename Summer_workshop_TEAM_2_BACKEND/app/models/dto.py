from pydantic import BaseModel
from typing import List, Optional


class GiftRecommendationRequest(BaseModel):
    birthday: str
    gender: str
    age: int
    job: str
    relationship: str
    budget_min: int
    budget_max: int


class GiftInfo(BaseModel):
    product_name: str
    approx_price_krw: int
    reason: str


class GiftRecommendationResponse(BaseModel):
    recommendations: List[GiftInfo]
