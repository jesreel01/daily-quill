export interface IApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
    validationErrors?: string[] | unknown;
    timestamp: string;
    path: string;
}
