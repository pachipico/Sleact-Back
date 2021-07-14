import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class NotLoggedIn implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return !request.isAuthenticated();
  }
}
