export interface RequestConfig {
  endpoint: string;
  headers?: any;
}

export interface GetRequestConfig extends RequestConfig {
  queryParams?: any;
}

export interface PostRequestConfig extends RequestConfig {
  body?: any;
}

export interface PutRequestConfig extends RequestConfig {
  body?: any;
  queryParams?: any;
}

export interface DeleteRequestConfig extends RequestConfig {
  queryParams?: any;
  body?: any;
}

export interface HttpInterceptor {
  request?: (config: any) => any | Promise<any>;
  response?: (response: any) => any | Promise<any>;
  error?: (error: any) => any | Promise<any>;
}

export interface HttpManager {
  get<T>(config: GetRequestConfig): Promise<T>;
  post<T>(config: PostRequestConfig): Promise<T>;
  put<T>(config: PutRequestConfig): Promise<T>;
  delete<T>(config: DeleteRequestConfig): Promise<T>;
  addInterceptor(interceptor: HttpInterceptor): void;
  // setToken(token: string | undefined): void;
}


// ESTOS YA SON MODELOS PROPIOS DE LA APP
export interface BaseHeaderDto {
  code: number | undefined;
  message: string | undefined;
  time: number | undefined;
  errorCode: number | undefined;
}

export interface BaseResponseDto<T> {
  header: BaseHeaderDto | undefined;
  data: T | undefined;
}

export class HttpError extends Error {
  statusCode: number | undefined;
  errorCode: number | undefined;

  constructor(
    statusCode: number | undefined,
    message: string | undefined,
    errorCode: number | undefined
  ) {
    super(message); // Llama al constructor de la clase base 'Error'
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    // Necesario para que instanceof funcione correctamente al usar TypeScript
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  toString(): string {
    return `${this.message} ${this.errorCode && `[${this.errorCode}]`}`;
  }
}
