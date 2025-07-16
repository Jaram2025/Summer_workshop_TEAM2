"""
Gemini API 키 테스트 스크립트
"""
import os
from google import generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def test_gemini_api():
    api_key = os.getenv('GEMINI_API_KEY')
    
    if not api_key:
        print("❌ GEMINI_API_KEY가 설정되지 않았습니다.")
        return False
    
    if api_key == "여기에_실제_API_키_입력":
        print("❌ API 키를 실제 값으로 변경해주세요.")
        return False
    
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        # 간단한 테스트 요청
        response = model.generate_content("안녕하세요")
        
        if response.text:
            print("✅ Gemini API 연결 성공!")
            print(f"테스트 응답: {response.text}")
            return True
        else:
            print("❌ 응답이 비어있습니다.")
            return False
            
    except Exception as e:
        print(f"❌ Gemini API 오류: {e}")
        return False

if __name__ == "__main__":
    test_gemini_api()
