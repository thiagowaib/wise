import { Injectable, Inject } from '@nestjs/common';
import { logio } from '../db/schema/logio.schema';

@Injectable()
export class LogioService {
  constructor(@Inject('DRIZZLE') private db: any) {}

  async createLog(entry: {
    method: string;
    endpoint: string;
    ip: string;
    userAgent?: string;
    requestData?: any;
    responseData?: any;
    statusCode?: string;
  }) {
    return this.db.insert(logio).values(entry).returning();
  }
}
