import { Component, OnInit } from '@angular/core';
import { Weather } from '../model/weather';
import { DiceRoll } from '../model/dice-roll';
import { AngularCsv } from 'angular7-csv';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css']
})
export class WeatherTableComponent implements OnInit {

  aNumber = 1;

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
        return 'Tropical Storm';
      case (x >= 17):
        return 'Rain';
      default:
        return 'Sunny';
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
    // const options = {
    //   fieldSeparator: ',',
    //   quoteStrings: '"',
    //   decimalseparator: '.',
    //   showLabels: true,
    //   showTitle: true,
    //   title: 'ToA Weather',
    //   useBom: true,
    //   noDownload: true,
    //   headers: ['Done', 'Day', 'Weather']
    // }
    // const csvFile = new AngularCsv(this.weatherData.reduce((acc, val) => acc.concat(val)), 'ToA-Weather', options);
    // console.log(csvFile)

    this.downloadFile(this.weatherData.reduce((acc, val) => acc.concat(val)));
  }


  downloadFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var blob = new Blob([csvArray], {type: 'text/csv' })
    saveAs(blob, "myFile.csv");
  }
}
