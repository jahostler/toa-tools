import { Component, OnInit } from '@angular/core';
import { Weather } from '../model/weather';
import { DiceRoll } from '../model/dice-roll';
import { AngularCsv } from 'angular7-csv';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css']
})
export class WeatherTableComponent implements OnInit {

  paginationCurrentPage = 1;
  paginationItemPerPage = 10;
  numRows = 100;
  pageIndexStart = 0;
  pageIndexEnd: number = this.paginationItemPerPage;
  // weatherData = Array<Weather>();
  weatherData = Array<Array<Weather>>();

  constructor() { }

  ngOnInit() {

    const pageCount = this.numRows / this.paginationItemPerPage;
    let dayCount = 0;
    for (let i = 0; i < pageCount; i++) {
      const weatherPage = new Array<Weather>();
      for(let j = 0; j < this.paginationItemPerPage; j++) {
        // if(dayCount >= this.numRows) {
        //   break;
        // }
        const tempWeather = this.randomWeather();
        weatherPage.push(new Weather(++dayCount, tempWeather));
      }
      this.weatherData.push(weatherPage);
    }
  }

  // return random number from 1 to max
  getRandom(max) {
    var x = Math.ceil(Math.random() * max);
    // console.log(x)
    return x;
  }

  randomWeather() {
    var x = this.getRandom(20);
    switch (true) {
      case (x == 20):
        return "Tropical Storm";
      case (x >= 17):
        return "Rain";
      default:
        return "Sunny";
    }
  }

  // toggleDone(row: Weather) {
  //   row.done = !row.done;
  //   console.log("row active: " + row.done);

  //   // console.log("row disabled: " + row.rowEnabled);
  // }


  onPageChange(currentPage: number) {
    this.paginationCurrentPage = currentPage;
    this.pageIndexStart = (currentPage - 1) * this.paginationItemPerPage;
    this.pageIndexEnd = this.pageIndexStart + this.paginationItemPerPage;
    // console.log(this.paginationCurrentPage);
  }

  generateCSV() {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'ToA Weather',
      useBom: true,
      noDownload: true,
      headers: ['Done', 'Day', 'Weather']
    }
    new AngularCsv(this.weatherData, 'ToA-Weather', options);
    // console.log(csvFile)
  }
}
