import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JuspayWebHookGuard extends AuthGuard('juspayWebhook') {
  async canActivate(context: ExecutionContext) {
    return (await super.canActivate(context)) as boolean;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
