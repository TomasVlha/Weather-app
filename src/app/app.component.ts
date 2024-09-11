import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OpenWeatherMapService } from './services/openweathermap.service';
import { IWeatherInformation } from './interfaces/weatherInformation.interface';
import { WeatherConditionToImageMap } from './interfaces/weatherInformation.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { WeatherDialogComponent } from './weather-dialog/weather-dialog.component';

const weatherImages: WeatherConditionToImageMap = {
  Thunderstorm: 'assets/thunderstorm.jpg',
  Drizzle: 'assets/drizzle.jpg',
  Rain: 'assets/rain.jpg',
  Snow: 'assets/snow.jpg',
  Clear: 'assets/clear.jpg',
  Clouds: 'assets/clouds.jpg'
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  city = '';
  weatherInfo: IWeatherInformation | null = null;
  errorMessage: string | null = null;
  backgroundImage: string = 'assets/default.jpg';

  constructor(
    private snackBar: MatSnackBar,
    private openWeatherMapService: OpenWeatherMapService,
    private dialog: MatDialog
  ) {}

  openWeatherModal(weatherData: any) {
    this.dialog.open(WeatherDialogComponent, {
      width: '50%',
      data: weatherData
    });
  }

  getWeather(): void {
    this.openWeatherMapService.getWeatherByCity(this.city).subscribe({
      next: (data) => {
        this.openWeatherModal(data);
        this.backgroundImage = weatherImages[data.weatherCondition] || 'assets/default.jpg';
      },
      error: (error) => {
        this.snackBar.open('City not found, please try another one.', 'Close', {
          duration: 10000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['snack-bar-style']
        });
      }
    });
  }
}
