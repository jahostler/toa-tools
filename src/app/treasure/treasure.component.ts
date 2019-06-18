import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TreasureTypes, CoinTypes, MagicItem,
         Treasure, Coins, TreasureTiers, } from '../model/treasure';
import { DiceRollerComponent } from '../dice-roller/dice-roller.component';

@Component({
  selector: 'app-treasure',
  templateUrl: './treasure.component.html',
  styleUrls: ['./treasure.component.css']
})
export class TreasureComponent implements OnInit {

  public modalOptions: Materialize.ModalOptions;

  dice: DiceRollerComponent;
  treasureForm: FormGroup;

  treasureTypes: Array<string> = ['Individual Treasure', 'Treasure Horde'];
  crTypes: Array<any> = [{
    label: 'Tier 1: 0-4', value: TreasureTiers.Tier1
  }, {
    label: 'Tier 2: 5-10', value: TreasureTiers.Tier2
  }, {
    label: 'Tier 3: 11-16', value: TreasureTiers.Tier3
  }, {
    label: 'Tier 4: 17+', value: TreasureTiers.Tier4
  }];


  coinsResult: Array<Coins>;



  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.treasureForm = this.fb.group({
      cr: [this.crTypes[0].value, Validators.required],
      treasure: [this.treasureTypes[0], Validators.required]
    });

    this.modalOptions = {
      dismissible: true,
      opacity: .25,
      inDuration: 200,
      outDuration: 100
    }
  }

  onSubmit() {
    console.log('Starting Loot Roll');

    console.log('cr: ' + this.treasureForm.controls.cr.value);
    console.log('treasure type: ' + this.treasureForm.controls.treasure.value);

    switch (this.treasureForm.controls.cr.value) {
      case 1:
        this.coinsResult = this.rollIndividualTreasureTier1();
        break;
      case 2:
        this.coinsResult = this.rollIndividualTreasureTier2();
        break;
      case 3:
        this.coinsResult = this.rollIndividualTreasureTier3();
        break;
      case 4:
        this.coinsResult = this.rollIndividualTreasureTier4();
        break;
    }
  }

  public getDiceRoll(n: number, value: number) {
    console.log('rolling '+ n + 'd' + value);
    let result = 0;
    for (let i = 0; i < n; i++) {
      let roll = Math.ceil(Math.random() * value);
      // console.log(roll);
      result += roll;
    }
    console.log(result);
    return result;
  }

  // Challenge Rating 0-4 Monster
  private rollIndividualTreasureTier1() {
    console.log('rolling for individual treasure tier 1');
    const roll = this.getDiceRoll(1, 100);
    if (roll <= 30) {
      return [new Coins(CoinTypes.cp, this.getDiceRoll(5, 6))];
    } else if(roll <= 60) {
      return [new Coins(CoinTypes.sp, this.getDiceRoll(4, 6))];
    } else if (roll <= 70) {
      return [new Coins(CoinTypes.ep, this.getDiceRoll(3, 6))];
    } else if (roll <= 95) {
      return [new Coins(CoinTypes.gp, this.getDiceRoll(3, 6))];
    } else {
      return [new Coins(CoinTypes.pp, this.getDiceRoll(1, 6))];
    }
  }

  // Challenge Rating 5-10 Monster
  private rollIndividualTreasureTier2() {
    console.log('rolling for individual treasure tier 2');
    const roll = this.getDiceRoll(1, 100);
    if (roll <= 30) {
      return [new Coins(CoinTypes.cp, this.getDiceRoll(4, 6) * 100),
              new Coins(CoinTypes.ep, this.getDiceRoll(1, 6) * 10)];
    } else if (roll <= 60) {
      return [new Coins(CoinTypes.sp, this.getDiceRoll(6, 6) * 10),
              new Coins(CoinTypes.gp, this.getDiceRoll(2, 6) * 10)];
    } else if (roll <= 70) {
      return [new Coins(CoinTypes.ep, this.getDiceRoll(3, 6) * 10),
              new Coins(CoinTypes.gp, this.getDiceRoll(2, 6) * 10)];
    } else if (roll <= 95) {
      return [new Coins(CoinTypes.gp, this.getDiceRoll(4, 6) * 10)];
    } else {
      return [new Coins(CoinTypes.gp, this.getDiceRoll(2, 6) * 10),
              new Coins(CoinTypes.pp, this.getDiceRoll(3, 6))];
    }
  }

  // Challenge Rating 11-16 Monster
  private rollIndividualTreasureTier3() {
    console.log('rolling for individual treasure tier 3');
    const roll = this.getDiceRoll(1, 100);
    if (roll <= 20) {
      return [new Coins(CoinTypes.sp, this.getDiceRoll(4, 6) * 100),
              new Coins(CoinTypes.gp, this.getDiceRoll(1, 6) * 100)];
    } else if (roll <= 35) {
      return [new Coins(CoinTypes.ep, this.getDiceRoll(1, 6) * 100),
              new Coins(CoinTypes.gp, this.getDiceRoll(1, 6) * 100)];
    } else if (roll <= 75) {
      return [new Coins(CoinTypes.gp, this.getDiceRoll(2, 6) * 100),
              new Coins(CoinTypes.pp, this.getDiceRoll(1, 6) * 10)];
    } else {
      return [new Coins(CoinTypes.gp, this.getDiceRoll(2, 6) * 100),
              new Coins(CoinTypes.pp, this.getDiceRoll(2, 6) * 10)];
    }
  }

  // Challenge Rating 17+ Monster
  private rollIndividualTreasureTier4() {
    console.log('rolling for individual treasure tier 4');
    const roll = this.getDiceRoll(1, 100);
    if (roll <= 15) {
      return [new Coins(CoinTypes.ep, this.getDiceRoll(2, 6) * 1000),
              new Coins(CoinTypes.gp, this.getDiceRoll(8, 6) * 100)];
    } else if (roll <= 55) {
      return [new Coins(CoinTypes.gp, this.getDiceRoll(1, 6) * 1000),
              new Coins(CoinTypes.pp, this.getDiceRoll(1, 6) * 100)];
    } else {
      return [new Coins(CoinTypes.gp, this.getDiceRoll(1, 6) * 100),
              new Coins(CoinTypes.pp, this.getDiceRoll(2, 6) * 100)];
    }
  }
}
