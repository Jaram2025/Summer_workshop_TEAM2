import os
import sys

# 프로젝트 루트 디렉토리를 Python 경로에 추가
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# 테스트용 환경 변수 설정
os.environ["OPENAI_API_KEY"] = "test-api-key"