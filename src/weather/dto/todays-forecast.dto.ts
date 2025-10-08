import { Type } from 'class-transformer';
import { 
    IsString, 
    IsNumber, 
    IsArray, 
    ValidateNested 
} from 'class-validator';

// ------------------------------
// Location
// ------------------------------
class Location {
    @IsString()
    name: string;

    @IsString()
    region: string;

    @IsString()
    country: string;

    @IsNumber()
    lat: number;

    @IsNumber()
    lon: number;

    @IsString()
    tz_id: string;

    @IsString()
    localtime: string;
}

// ------------------------------
// Weather Condition
// ------------------------------
class WeatherCondition {
    @IsString()
    text: string;

    @IsString()
    icon: string;
}

// ------------------------------
// Current Weather
// ------------------------------
class CurrentWeather {
    @IsNumber()
    temp_c: number;

    @IsNumber()
    feelslike_c: number;

    @IsNumber()
    humidity: number;

    @IsNumber()
    wind_kph: number;

    @ValidateNested()
    @Type(() => WeatherCondition)
    condition: WeatherCondition;
}

// ------------------------------
// Day Forecast
// ------------------------------
class DayForecast {
    @IsNumber()
    maxtemp_c: number;

    @IsNumber()
    mintemp_c: number;

    @IsNumber()
    avgtemp_c: number;

    @IsNumber()
    daily_chance_of_rain: number;

    @ValidateNested()
    @Type(() => WeatherCondition)
    condition: WeatherCondition;
}

// ------------------------------
// ForecastDay
// ------------------------------
class ForecastDay {
    @IsString()
    date: string;

    @ValidateNested()
    @Type(() => DayForecast)
    day: DayForecast;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ForecastHour)
    hour: ForecastHour[];
}

// ------------------------------
// Forecast
// ------------------------------
class Forecast {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ForecastDay)
    forecastday: ForecastDay[];
}

// ------------------------------
// ForecastHour
// ------------------------------
class ForecastHour {
    @IsString()
    time: string;

    @IsNumber()
    temp_c: number;

    @IsNumber()
    precip_mm: number;

    @IsNumber()
    cloud: number;

    @IsNumber()
    humidity: number;

    @IsNumber()
    chance_of_rain: number;
}

export class TodaysForecastDto {
    // ------------------------------
    // ROOT PROPERTIES
    // ------------------------------
    @ValidateNested()
    @Type(() => Location)
    location: Location;

    @ValidateNested()
    @Type(() => CurrentWeather)
    current: CurrentWeather;

    @ValidateNested()
    @Type(() => Forecast)
    forecast: Forecast;
}

