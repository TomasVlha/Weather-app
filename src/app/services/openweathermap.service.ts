import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IWeatherInformation } from '../interfaces/weatherInformation.interface';

@Injectable({ providedIn: 'root' })
export class OpenWeatherMapService {
  private apiKey = 'b6d9a5248d326b7074935386a9055f6c';

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string): Observable<IWeatherInformation> {
    return this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`)
      .pipe(
        map(response => ({
          cityName: response.name,
          country: response.sys.country,
          temperature: response.main.temp,
          weatherCondition: response.weather[0].main,
          iconUrl: `http://openweathermap.org/img/w/${response.weather[0].icon}.png`,
          humidity: response.main.humidity,
          windSpeed: response.wind.speed
        })),
        catchError(error => {
          if (error.status === 404) {
            return throwError(() => new Error('City not found'));
          }
          return throwError(() => error);
        })
      );
  }
}