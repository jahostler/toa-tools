import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TreasureTypes, CoinTypes, MagicItem,
         Treasure, Coins, TreasureTiers, Loot, TreasureModel, } from '../model/treasure';
import { DiceRollerComponent } from '../dice-roller/dice-roller.component';
import { TreasureService } from './treasure.service';


// const treasureHordeT1: [number, Loot]



@Component({
  selector: 'app-treasure',
  templateUrl: './treasure.component.html',
  styleUrls: ['./treasure.component.css']
})
export class TreasureComponent implements OnInit {

  public modalOptions: Materialize.ModalOptions;

  treasureForm: FormGroup;
  treasureService: TreasureService = new TreasureService();

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


  lootResult: Loot;
  lootPromise: Promise<boolean>;
  treasureModel: TreasureModel;



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
    const cr = this.treasureForm.controls.cr.value;
    const type = this.treasureForm.controls.treasure.value;
    console.log('cr: ' + cr);
    console.log('treasure type: ' + type);

    this.treasureModel = new TreasureModel(cr, type);

    this.getLoot();

  }

  public getLoot() {
    // this.treasureService.rollLoot(this.treasureModel).subscribe(
    //   (result) => {
    //     this.lootResult.coins = result.coins;
    //     this.lootResult.treasure = result.treasure;
    //     this.lootResult.magicItems = result.magicItems;
    //     console.log('loot result: ' + this.lootResult);
    //     this.lootPromise = Promise.resolve(true);
    //   },
    //   error => {
    //     console.error('could not retrieve loot results');
    //   }
    // );


    this.treasureService.rollLoot(this.treasureModel).subscribe(
      result => {
        this.lootResult = result;
        this.lootPromise = Promise.resolve(true);
      }
    );

    console.log(this.lootResult);
  }
}
