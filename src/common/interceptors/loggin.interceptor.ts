/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap, map, catchError, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name, {
    timestamp: true,
  });
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    this.logger.log(`[Request] ${method} ${url} - ${now}`);

    return next.handle().pipe(
      tap(() =>
        this.logger.log(`[Response] ${method} ${url} - ${Date.now() - now}ms`),
      ),
      map((data) => ({
        success: true,
        data,
      })),
      catchError((err: Observable<any>) => {
        this.logger.error(err);
        return throwError(() => err);
      }),
    );
  }
}
