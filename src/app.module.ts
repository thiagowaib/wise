import { MiddlewareConsumer, Module, UseGuards } from '@nestjs/common';
import { DrizzleModule } from './db/drizzle.module';
import { LogioMiddleware } from './logio/logio.middleware';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LogioService } from './logio/logio.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DrizzleModule,
    WeatherModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService, LogioService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogioMiddleware).forRoutes('');
  }
}
