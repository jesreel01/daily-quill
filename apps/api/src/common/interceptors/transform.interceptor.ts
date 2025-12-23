import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse } from '../interfaces/api-response.interface';
import { Request, Response } from 'express';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  IApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IApiResponse<T>> {
    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        statusCode: context.switchToHttp().getResponse<Response>().statusCode,
        message: 'Operation successful',
        data,
        timestamp: new Date().toISOString(),
        path: context.switchToHttp().getRequest<Request>().url,
      })),
    );
  }
}
