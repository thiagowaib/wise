import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
  imports: [WeatherModule],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
