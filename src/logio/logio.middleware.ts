import { Injectable, NestMiddleware } from '@nestjs/common';
import { LogioService } from './logio.service';

@Injectable()
export class LogioMiddleware implements NestMiddleware {
  constructor(private readonly logioService: LogioService) {}

  async use(req: any, res: any, next: () => void) {
    const { method, url, ip, headers, body, query } = req;

    const originalSend = res.send;

    res.send = async (bodyResponse?: any) => {
      try {
        await this.logioService.createLog({
          method,
          endpoint: url,
          ip,
          userAgent: headers['user-agent'],
          requestData: { body, query },
          responseData: bodyResponse ? JSON.parse(bodyResponse) : null,
          statusCode: res.statusCode.toString(),
        });
      } catch (err) {
        console.error("Erro ao salvar logio:", err);
      }

      return originalSend.call(res, bodyResponse);
    };

    next();
  }
}
