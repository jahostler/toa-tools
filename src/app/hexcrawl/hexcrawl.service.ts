import { Injectable } from '@angular/core';
import { Crawl, AdvEnum, PaceEnum } from '../model/crawl-form'
import { CrawlResult, EncounterResults } from '../model/crawl-result';
import { Observable } from 'rxjs';
import { of } from "rxjs";

//used to map d6 roll to a random direction for hex crawl
const directionMap = {
  1: "North-East",
  2: "East",
  3: "South-East",
  4: "South-West",
  5: "West",
  6: "North-West"
};

@Injectable({
  providedIn: 'root'
})
export class HexcrawlService {

  crawlResult: CrawlResult;

  constructor() { 
    this.crawlResult = new CrawlResult();
  }

  public performCrawl(crawlModel: Crawl):Observable<CrawlResult>{
    // console.log(crawlModel.advCheck)

    var roll = this.makeRoll(crawlModel.advCheck);
    // console.log('rollResult: ' + roll);
    this.crawlResult.rollPlusMod = roll + crawlModel.survivalMod;
    console.log('roll with mod: ' + roll + ' + ' + crawlModel.survivalMod + ' = ' + this.crawlResult.rollPlusMod);

    var paceDC = this.getPaceDC(crawlModel.pace);
    this.crawlResult.navCheckDC = crawlModel.terrainDC + paceDC;
    console.log("checkDC: " + crawlModel.terrainDC + " + " + paceDC + " = " + this.crawlResult.navCheckDC);


    if (this.crawlResult.rollPlusMod >= this.crawlResult.navCheckDC) {
      console.log("Success!");
      this.crawlResult.navCheckPass = true;
    } else {
      console.log("Fail!");
      this.crawlResult.navCheckPass = false;
      this.crawlResult.lostDirection = this.getLostDirection();
    }


    this.crawlResult.encounterResults = this.randomEncounterCheck();

    // console.log(this.crawlResult)
    return of(this.crawlResult);
    
    
  }

  rollD6() {
    var roll: number = Math.ceil(Math.random() * 6);
    console.log("rollD6: " + roll);
    return roll;
  }

  rollD20() {
    var roll:number = Math.ceil(Math.random() * 20);
    console.log("rollD20: " + roll);
    return roll;
  }

  rollD100() {
    var roll: number = Math.ceil(Math.random() * 100);
    console.log("rollD100: " + roll);
    return roll;
  }

  makeRoll(adv:AdvEnum){
    if(adv === AdvEnum.None) {
      console.log("rolling normally")
      return this.rollD20();
    } else {
      var roll1 = this.rollD20();
      var roll2 = this.rollD20();
      if(adv === AdvEnum.Advantage) {
        console.log("rolling with advantage")
        var highRoll = (roll1 > roll2) ? roll1 : roll2;
        return highRoll;
      } else if (adv === AdvEnum.Disadvantage) {
        console.log("rolling with disadvantage")
        var lowRoll = (roll1 < roll2) ? roll1 : roll2;
        return lowRoll;
      } else{
        console.error("ENUM TYPES NOT EQUAL");
      }
    }
  }

  getPaceDC(pace: PaceEnum){
    switch(pace) {
      case PaceEnum.Fast:
        return 5;
      case PaceEnum.Normal:
        return 0;
      case PaceEnum.Slow:
        return -5;
    }
  }


  getLostDirection() {
    var roll = this.rollD6();
    return directionMap[roll];
  }

  randomEncounterCheck() {
    var encounterResults:EncounterResults = new EncounterResults();
    for(const key in encounterResults) {
      if(this.rollD20() >= 16) {
        encounterResults[key] = this.rollD100();
      }
      console.log(key + " encounter: " + encounterResults[key]);
    }
    return encounterResults;
  }


}
