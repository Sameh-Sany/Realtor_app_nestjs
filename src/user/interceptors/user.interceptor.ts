import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split('Bearer ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    const user = jwt.decode(token);

    request.user = user;

    return handler.handle();
  }
}
