//export type Result<T> = { ok: true; value: T } | { ok: false; err: string };
export type Result<T, E> = [T, null] | [null, E];

export interface UserFormData {
    birthday: string;
    gender: string;
    age: number;
    job: string;
    relationship: string;
    budget_min: number;
    budget_max: number;
}

export interface Product {
  product_name: string;
  approx_price_krw: number;
  reason: string;
}

export interface GiftRecommendationResponse {
  recommendations: Product[];
}

// export interface ApiResponse {
//   message: string;
//   status: 'success' | 'error'; 
//   data?: Product[];  
// }