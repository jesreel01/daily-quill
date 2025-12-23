import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IApiResponse } from '../interfaces/api-response.interface';
import { Request, Response } from 'express';

interface ExceptionResponseObject {
  message?: string | string[];
  error?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    let error = 'Internal Server Error';
    let message = 'An unexpected error occurred';
    let validationErrors: string[] | null = null;

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null
    ) {
      const resp = exceptionResponse as ExceptionResponseObject;
      message = typeof resp.message === 'string' ? resp.message : message;
      error = resp.error ?? error;

      if (Array.isArray(resp.message)) {
        validationErrors = resp.message;
        message = 'Validation failed';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const apiResponse: IApiResponse<null> = {
      success: false,
      statusCode: status,
      message,
      error,
      validationErrors,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(apiResponse);
  }
}
