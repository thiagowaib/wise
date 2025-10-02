import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DrizzleModule } from './db/drizzle.module';
import { LogioMiddleware } from './logio/logio.middleware';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LogioService } from './logio/logio.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule
  ],
  controllers: [AppController],
  providers: [AppService, LogioService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogioMiddleware).forRoutes('');
  }
}
