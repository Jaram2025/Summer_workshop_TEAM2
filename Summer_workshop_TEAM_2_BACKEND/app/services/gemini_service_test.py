from app.models.dto import GiftInfo

def gift_recommend(birthday: str, gender: str, age: int, job: str, relationship: str, budget_min: int, budget_max: int):
    """
    임시 테스트용 함수 - 하드코딩된 응답 반환
    """
    print(f"테스트 모드 - 나이: {age}, 성별: {gender}, 직업: {job}, 관계: {relationship}, 예산: {budget_min}-{budget_max}")
    
    # 하드코딩된 테스트 데이터
    test_gifts = [
        {
            "product_name": "스타벅스 텀블러",
            "approx_price_krw": 25000,
            "reason": f"{age}세 {gender} {job}에게 실용적인 선물로 좋습니다."
        },
        {
            "product_name": "무선 이어폰",
            "approx_price_krw": 45000,
            "reason": f"{relationship} 사이에서 인기 있는 선물입니다."
        },
        {
            "product_name": "향수 선물세트",
            "approx_price_krw": 35000,
            "reason": "특별한 날을 위한 기념품으로 적합합니다."
        }
    ]
    
    # 예산에 맞는 선물만 필터링
    filtered_gifts = []
    for gift in test_gifts:
        if budget_min <= gift["approx_price_krw"] <= budget_max:
            filtered_gifts.append(gift)
    
    # 적어도 하나의 선물은 반환
    if not filtered_gifts:
        filtered_gifts = [test_gifts[0]]  # 첫 번째 선물을 기본으로 반환
    
    # GiftInfo 객체로 변환
    recommended_gifts = []
    for gift in filtered_gifts:
        try:
            gift_info = GiftInfo(**gift)
            recommended_gifts.append(gift_info)
            print(f"테스트 상품 추가: {gift_info.product_name} - {gift_info.approx_price_krw}원")
        except Exception as e:
            print(f"테스트 상품 변환 오류: {e}")
            continue
    
    return recommended_gifts
