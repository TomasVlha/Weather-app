export interface IWeatherInformation {
  cityName: string;
  country: string;
  temperature: number;
  weatherCondition: string;
  iconUrl: string;
  humidity: number;
  windSpeed: number;
}

export interface WeatherConditionToImageMap {
  [key: string]: string;
}