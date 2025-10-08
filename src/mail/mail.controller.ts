import { Controller, Get, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { WeatherService } from 'src/weather/weather.service';
import { ApiKeyGuard } from 'src/guards/apikey.guards';

@Controller('mail')
export class MailController {

    constructor(
        private readonly mailService: MailService,
        private readonly weatherService: WeatherService
    ) {}

    @Get('forecast/today')
    @UseGuards(ApiKeyGuard)
    async mailTodayForecast() {
        const forecast = await this.weatherService.getForecast('Marilia', 1);
        
        const today = forecast.forecast.forecastday[0];
        const maxTemp = today.day.maxtemp_c;
        const minTemp = today.day.mintemp_c;

        let rainyHours : Array<{hour: string, chance: number}> = [];
        today.hour.forEach(h => {
            if(h.chance_of_rain >= 40) {
                const hour = new Date(h.time).getHours().toString().padStart(2, '0') + ':00';
                rainyHours.push({hour, chance: h.chance_of_rain});
            }
        });

        const data = {
            location: forecast.location.name,
            date: today.date,
            maxTemp,
            minTemp,
            rainyHours
        };

        await this.mailService.sendForecastMail( 'thiagowaib@gmail.com', data );

        return {
            message: '✅ E-mail de previsão enviado com sucesso!',
            summary: data
        };
    }
}
