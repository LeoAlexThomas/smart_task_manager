export interface SideBarMenu {
  name: string;
  url: string;
  imageUrl: string;
  activeImageUrl: string;
}

export interface ApiResponse {
  isSuccess: boolean;
  message: string;
}

export interface ApiSuccessResponse<T> {
  isSuccess: true;
  data: T;
}

export interface ApiErrorResponse {
  isSuccess: false;
  error: ErrorResponse;
}

export type CustomApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ErrorResponse {
  message: string;
}
