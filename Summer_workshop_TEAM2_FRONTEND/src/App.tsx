import { useState } from 'react';
import './App.css';
import UserForm from './component/UserForm';
import type { UserFormData, Product} from "./type/type";
import ApiManager from './api/api';
import ResultForm from "./component/ResultForm.tsx";

export default function App() {
  const apiManager = new ApiManager();

  const [receivedFormData, setReceivedFormData] = useState<UserFormData | null>(null);
  const [resultData, setResultData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUserFormSubmit = async (data: UserFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setReceivedFormData(data);

    const [result, err] = await apiManager.post(data);
    
    setIsLoading(false);
    
    if(err != null){
      setError(err.message);
      console.error('API 오류:', err);
    } else{
      if(result != null) {
        setResultData(result);
      }
    }
  };

  const resetForm = ():void => {
    setReceivedFormData(null);
    setResultData([]);
    setError(null);
  };

  return (
    <>
      <div className="App">
        <h2 onClick={resetForm} style={{cursor: 'pointer'}}>
          GIFT RECOMMENDATION SERVICE
        </h2>
        
        {isLoading && (
          <div style={{textAlign: 'center', padding: '20px'}}>
            <p>선물을 추천하는 중입니다... 잠시만 기다려주세요.</p>
            <div style={{animation: 'spin 1s linear infinite', display: 'inline-block'}}>🎁</div>
          </div>
        )}
        
        {error && (
          <div style={{
            color: 'red', 
            textAlign: 'center', 
            padding: '20px',
            backgroundColor: '#ffebee',
            borderRadius: '5px',
            margin: '20px 0'
          }}>
            <p>오류: {error}</p>
            <button onClick={resetForm} style={{
              padding: '10px 20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>다시 시도</button>
          </div>
        )}
        
        {!receivedFormData && !isLoading && (
          <UserForm onSubmit={handleUserFormSubmit} />
        )}
        
        {receivedFormData && !isLoading && !error && (
          <ResultForm products={resultData}/>
        )}
      </div>
    </>
  );
}