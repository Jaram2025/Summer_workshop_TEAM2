import axios from 'axios';
import type { Result, UserFormData, Product, GiftRecommendationResponse} from '../type/type';
// interface ApiRequest {
//
// }

export default class ApiManager {
    // Vite 프록시를 사용하는 경우
    // API_URL: string = "/api/profile"
    
    // 또는 직접 백엔드 URL을 사용하는 경우
    API_URL: string = "http://localhost:8000/profile"

    async post(data: UserFormData): Promise<Result<Product[], Error>>{
        try {
            console.log('API로 전송할 데이터:', data);

            const response = await axios.post<GiftRecommendationResponse>(this.API_URL, data);

            console.log('API 응답 데이터:', response.data);
            
            const result = response.data.recommendations;
            if (!result || result.length === 0) {
                return [null, new Error("추천 결과가 없습니다.")];
            }
            return [result, null];
        } catch (error) {
            console.error('API 호출 오류:', error);
            if (axios.isAxiosError(error)) {
                return [null, new Error(error.response?.data?.detail || '서버 오류가 발생했습니다.')];
            }
            return [null, new Error('예상치 못한 오류가 발생했습니다.')];
        }
    }
}

    //   }

    //   } catch (error) {
    //     if (axios.isAxiosError(error)) { 
    //       console.error('App.tsx: API 요청 오류:', error.message);
    //       const errorMessage = error.response?.data?.message || '서버와 통신 중 오류가 발생했습니다.';
    //       setApiMessage(errorMessage);
    //       setApiStatus('error');
    //     } else {
    //       console.error('App.tsx: 예상치 못한 오류:', error);
    //       setApiMessage('예상치 못한 오류가 발생했습니다.');
    //       setApiStatus('error');
    //     }
    //   } finally {
    //     setIsLoading(false);
    //   }