import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import {
  BaseResponseDto,
  DeleteRequestConfig,
  GetRequestConfig,
  HttpError,
  HttpInterceptor,
  HttpManager,
  PostRequestConfig,
  PutRequestConfig,
} from "./HttpManager";

class HttpAxiosManager implements HttpManager {
  private axiosInstance: AxiosInstance;
  private token: string | undefined;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  setToken(token: string | undefined): void {
    this.token = token;
  }

  async get<T>({
    endpoint,
    queryParams = {},
    headers = {},
  }: GetRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint, {
        params: queryParams,
        headers: {
          ...headers,
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        },
      });
      return this.resolveResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post<T>({
    endpoint,
    body = {},
    headers = {},
  }: PostRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.post(endpoint, body, {
        headers: {
          ...headers,
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        },
      });
      return this.resolveResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put<T>({
    endpoint,
    body = {},
    headers = {},
    queryParams,
  }: PutRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.put<T>(endpoint, body, {
        params: queryParams,
        headers: {
          ...headers,
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        },
      });
      return this.resolveResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete<T>({
    endpoint,
    queryParams = {},
    headers = {},
  }: DeleteRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.delete<T>(endpoint, {
        params: queryParams,
        headers: {
          ...headers,
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        },
      });
      return this.resolveResponse<T>(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  addInterceptor(interceptor: HttpInterceptor): void {
    if (interceptor.request) {
      this.axiosInstance.interceptors.request.use(interceptor.request);
    }
    if (interceptor.response) {
      this.axiosInstance.interceptors.response.use(interceptor.response);
    }
  }

  private resolveResponse<T>(response: AxiosResponse<any>): T {
    const baseResponse = response.data as BaseResponseDto<T>;
    return baseResponse.data as T;
  }

  private async handleError(error: unknown): Promise<never> {
    if (error instanceof AxiosError) {
      //Esta parte es para manejar el token en dado caso que las peticiones se tenga que mandar un token
      // if (error.response?.status === 401) {
      //   this.setToken(undefined);
      // }

      const statusCode = error.response?.data?.headers?.code ?? 500;
      const message = error.response?.data?.headers?.message ?? error.message;
      const errorCode = error.response?.data?.headers?.errorCode ?? -80;

      throw new HttpError(statusCode, message, errorCode);
    }

    throw error;
  }
}

export default HttpAxiosManager;
