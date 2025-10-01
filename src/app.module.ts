import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DrizzleModule } from './db/drizzle.module';
import { LogioService } from './logio/logio.service';
import { LogioMiddleware } from './logio/logio.middleware';
@Module({
  imports: [DrizzleModule],
  controllers: [],
  providers: [LogioService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogioMiddleware).forRoutes('');
  }
}
