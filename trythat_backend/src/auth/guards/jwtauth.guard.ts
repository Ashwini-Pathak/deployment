import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
// import { UnauthorizedException } from '../../_app/exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  userId: string;
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const params = request.params;
    const userId = params?.id;

    this.userId = userId;

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user || this.userId !== user.id) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
