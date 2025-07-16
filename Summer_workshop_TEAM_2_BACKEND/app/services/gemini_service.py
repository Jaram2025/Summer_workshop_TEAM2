from app.core.config import get_settings
from google import generativeai as genai
import json
from google.generativeai import types
from app.models.dto import GiftInfo


settings = get_settings()
# Gemini API 설정 - OPENAI_API_KEY가 아닌 GEMINI_API_KEY 또는 GOOGLE_API_KEY를 사용해야 합니다
genai.configure(api_key=settings.GEMINI_API_KEY)

def gift_recommend(birthday: str, gender: str, age: int, job: str, relationship: str, budget_min: int, budget_max: int):
    try:
        print(f"Gemini API 호출 시작 - 나이: {age}, 성별: {gender}, 직업: {job}, 관계: {relationship}, 예산: {budget_min}-{budget_max}")
        
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(f"""
You are a top-tier personalized gift recommendation specialist.
The customer is {age} years old, gender: {gender or 'not specified'},
job: {job}, relationship: {relationship}, budget: {budget_min} ~ {budget_max} KRW.
Based on these details, recommend up to 3 real products available in South Korea,
referencing actual brands or product names that can be found on sites like Naver Shopping or Coupang.
The recommended products must be between the given budgets.
Answer strictly in Korean.

응답은 다음 JSON 배열 스키마를 따릅니다. 최대 3개의 추천 항목을 포함합니다.
[
  {{
    "product_name": "string (실제 제품명/브랜드 포함)",
    "approx_price_krw": 30000,
    "reason": "string (추천 이유)"
  }},
  {{
    "product_name": "string (실제 제품명/브랜드 포함)",
    "approx_price_krw": 25000,
    "reason": "string (추천 이유)"
  }}
]
(최대 3개 항목)
""")

        print(f"Gemini API 응답 받음: {response.text[:200]}...")
        
        generated_text = response.text.strip()
        
        # JSON 마크다운 블록 제거
        if generated_text.startswith("```json") and generated_text.endswith("```"):
            json_part = generated_text[7:-3].strip()
        elif generated_text.startswith("```") and generated_text.endswith("```"):
            json_part = generated_text[3:-3].strip()
        else:
            json_part = generated_text
            
        print(f"JSON 파싱 시도: {json_part[:100]}...")
        
        # JSON 파싱 시도
        parsed_data = json.loads(json_part)
        
        print(f"JSON 파싱 성공: {len(parsed_data)}개 항목")
        
        if not isinstance(parsed_data, list):
            raise ValueError("Gemini가 JSON 배열이 아닌 다른 형식을 반환했습니다.")
            
        # Pydantic 모델 리스트로 변환 및 유효성 검사
        recommended_gifts = []
        for item in parsed_data:
            try:
                gift = GiftInfo(**item)
                recommended_gifts.append(gift)
                print(f"상품 추가: {gift.product_name} - {gift.approx_price_krw}원")
            except Exception as e:
                print(f"상품 변환 오류: {e} - 항목: {item}")
                continue
        
        if not recommended_gifts:
            raise ValueError("유효한 상품 추천 결과가 없습니다.")
            
        return recommended_gifts
    
    except json.JSONDecodeError as e:
        print(f"JSON 디코딩 오류: {e}")
        print(f"원본 응답: {generated_text}")
        raise ValueError(f"Gemini 응답을 JSON으로 파싱할 수 없습니다: {e}")
    except Exception as e:
        print(f"전체 오류: {e}")
        raise ValueError(f"선물 추천 중 오류가 발생했습니다: {e}")


            