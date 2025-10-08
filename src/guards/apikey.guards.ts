import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['apikey'];
    if(process.env.APIKEY === apiKey) {
      return true;
    } else {
      throw new ForbiddenException('API Key inválida ou ausente');
    }
  }
}
