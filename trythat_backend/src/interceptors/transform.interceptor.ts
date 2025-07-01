import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { get, isObject } from 'lodash';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) => throwError(() => this.errorHandler(err, context))),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context?.switchToHttp();
    const response = ctx?.getResponse();

    const status = exception instanceof HttpException ? exception?.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorException: any = exception;

    if (exception?.getResponse) {
      const exceptionResponse = exception?.getResponse();

      if (isObject(exceptionResponse) && !Array.isArray(exceptionResponse)) {
        errorException = exceptionResponse;
      }

      if (Array.isArray(exceptionResponse)) {
        errorException = get(exceptionResponse, '0', {});
      }
    }

    response?.status(status).json({
      success: false,
      response: null,
      errors: errorException,
    });
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx?.getResponse();

    const statusCode = response?.statusCode;

    return {
      success: true,
      response: {
        code: statusCode,
        message: res?.message,
        data: res?.data,
      },
      errors: null,
    };
  }
}
