import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { firstValueFrom } from 'rxjs';
import { TodaysForecastDto } from './dto/todays-forecast.dto';

@Injectable()
export class WeatherService {
    constructor(private readonly httpService: HttpService) {}

    async getForecast(city:string = 'Marilia', days:number = 1) {
        const queryUrl = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`;
        try{
            const response = await firstValueFrom(this.httpService.get(queryUrl));
            const forecast = plainToInstance(TodaysForecastDto, response.data);
            return forecast;
        } catch (err) {
            throw new Error('Erro ao buscar dados da API Externa', err);
        }
    }
}
