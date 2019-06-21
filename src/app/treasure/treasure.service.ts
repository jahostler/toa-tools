import { Injectable } from '@angular/core';
import { MagicItem, Loot, Coins, CoinTypes, Treasure, TreasureTypes, TreasureModel } from '../model/treasure';
import { Observable, of } from 'rxjs';

const magicTableA: [number, MagicItem][] = [
  [50, new MagicItem('Potion of healing', 187)],
  [60, new MagicItem('Spell scroll (cantrip)', 200)],
  [70, new MagicItem('Potion of climbing', 187)],
  [90, new MagicItem('Spell scroll (1st level)', 200)],
  [94, new MagicItem('Spell scroll (2nd level)', 200)],
  [98, new MagicItem('Potion of greater healing', 187)],
  [99, new MagicItem('Bag of holding', 153)],
  [100, new MagicItem('Driftglobe', 166)]
];

const magicTableB: [number, MagicItem][] = [
  [15, new MagicItem('Potion of greater healing', 187)],
  [22, new MagicItem('Potion of fire breath', 187)],
  [29, new MagicItem('Potion of resistance', 188)],
  [34, new MagicItem('Ammunition, +1', 150)],
  [39, new MagicItem('Potion of animal friendship', 187)],
  [44, new MagicItem('Potion of hill giant strength', 187)],
  [49, new MagicItem('Potion of growth', 187)],
  [54, new MagicItem('Potion of water breathing', 188)],
  [59, new MagicItem('Spell scroll (2nd level)', 200)],
  [64, new MagicItem('Spell scroll (3rd level)', 200)],
  [67, new MagicItem('Bag of holding', 153)],
  [70, new MagicItem('Keoghtom\'s ointment', 179)],
  [73, new MagicItem('Oil of slipperiness', 184)],
  [75, new MagicItem('Dust of disappearance', 166)],
  [77, new MagicItem('Dust of dryness', 166)],
  [79, new MagicItem('Dust of sneezing and choking', 166)],
  [81, new MagicItem('Elemental gem', 167)],
  [83, new MagicItem('Philter of love', 184)],
  [84, new MagicItem('Alchemy jug', 150)],
  [85, new MagicItem('Cap of water breathing', 157)],
  [86, new MagicItem('Cloak of the manta ray', 159)],
  [87, new MagicItem('Driftglobe', 166)],
  [88, new MagicItem('Goggles of night', 172)],
  [89, new MagicItem('Helm of comprehending languages', 173)],
  [90, new MagicItem('Immovable rod', 175)],
  [91, new MagicItem('Lantern of revealing', 179)],
  [92, new MagicItem('Mariner\'s armor', 181)],
  [93, new MagicItem('Mithral armor', 182)],
  [94, new MagicItem('Potion of poison', 188)],
  [95, new MagicItem('Ring of swimming', 193)],
  [96, new MagicItem('Robe of useful items', 195)],
  [97, new MagicItem('Rope of climbing', 197)],
  [98, new MagicItem('Saddle of the cavalier', 199)],
  [99, new MagicItem('Wand of magic detection', 211)],
  [100, new MagicItem('Wand of secrets', 211)]
];

const magicTableC: [number, MagicItem][] = [
  [15, new MagicItem('Potion of superior healing', 187)],
  [22, new MagicItem('Spell scroll (4th level)', 200)],
  [27, new MagicItem('Ammunition, +2', 150)],
  [32, new MagicItem('Potion of clairvoyance', 0)],
  [37, new MagicItem('Potion of diminution', 0)],
  [42, new MagicItem('Potion of gaseous form', 0)],
  [47, new MagicItem('Potion of frost giant strength', 0)],
  [52, new MagicItem('Potion of stone giant strength', 0)],
  [57, new MagicItem('Potion of heroism', 0)],
  [62, new MagicItem('Potion of invulnerability', 0)],
  [67, new MagicItem('Potion of mind reading', 0)],
  [72, new MagicItem('Spell scroll (5th level)', 0)],
  [75, new MagicItem('Elixir of health', 0)],
  [78, new MagicItem('Oil of etherealness', 0)],
  [81, new MagicItem('Potion of fire giant strength', 0)],
  [84, new MagicItem('Quaal\'s feather token', 0)],
  [87, new MagicItem('Scroll of protection', 0)],
  [89, new MagicItem('Bag of beans', 0)],
  [91, new MagicItem('Bead of force', 0)],
  [92, new MagicItem('Chime of opening', 0)],
  [93, new MagicItem('Decanter of endless water', 0)],
  [94, new MagicItem('Eyes of minute seeing', 0)],
  [95, new MagicItem('Folding boat', 0)],
  [96, new MagicItem('Heward\'s handy haversack', 0)],
  [97, new MagicItem('Horseshoes of speed', 0)],
  [98, new MagicItem('Necklace of fireballs', 0)],
  [99, new MagicItem('Periapt of health', 0)],
  [100, new MagicItem('Sending stones', 0)],
];


// const magicTableF: [number, MagicItem][] = [
//   [999, new MagicItem('Driftglobe', 0)],
// ];


@Injectable({
  providedIn: 'root'
})
export class TreasureService {

  constructor() {

   }

  public rollLoot(treasureModel: TreasureModel): Observable<Loot> {
    console.log('rolling loot')
    if (treasureModel.type === 'Individual Treasure') {
      switch (treasureModel.cr) {
        case 1:
          return of(this.rollIndividualTreasureTier1());
        case 2:
          return of(this.rollIndividualTreasureTier2());
        case 3:
          return of(this.rollIndividualTreasureTier3());
        case 4:
          return of(this.rollIndividualTreasureTier4());
      }
    } else {
      switch (treasureModel.cr) {
        case 1:
          return of(this.rollTreasureHordeTier1());
        // case 2:
        //   this.lootResult = this.rollIndividualTreasureTier2();
        //   break;
        // case 3:
        //   this.lootResult = this.rollIndividualTreasureTier3();
        //   break;
        // case 4:
        //   this.lootResult = this.rollIndividualTreasureTier4();
        //   break;
      }
    }
  }

  public getDiceRoll(n: number, value: number): number {
    console.log('rolling ' + n + 'd' + value);
    let result = 0;
    for (let i = 0; i < n; i++) {
      const roll = Math.ceil(Math.random() * value);
      // console.log(roll);
      result += roll;
    }
    console.log(result);
    return result;
  }

  // Challenge Rating 0-4 Monster
  private rollIndividualTreasureTier1(): Loot {
    console.log('rolling for individual treasure tier 1');
    const roll = this.getDiceRoll(1, 100);
    if (roll <= 30) {
      return new Loot([new Coins(CoinTypes.cp, this.getDiceRoll(5, 6))] as Array<Coins>);
    } else if (roll <= 60) {
      return new Loot([new Coins(CoinTypes.sp, this.getDiceRoll(4, 6))] as Array<Coins>);
    } else if (roll <= 70) {
      return new Loot([new Coins(CoinTypes.ep, this.getDiceRoll(3, 6))] as Array<Coins>);
    } else if (roll <= 95) {
      return new Loot([new Coins(CoinTypes.gp, this.getDiceRoll(3, 6))] as Array<Coins>);
    } else {
      return new Loot([new Coins(CoinTypes.pp, this.getDiceRoll(1, 6))] as Array<Coins>);
    }
  }

  // Challenge Rating 5-10 Monster
  private rollIndividualTreasureTier2(): Loot {
    console.log('rolling for individual treasure tier 2');
    const roll = this.getDiceRoll(1, 100);
    if (roll <= 30) {
      return new Loot([new Coins(CoinTypes.cp, this.getDiceRoll(4, 6) * 100),
      new Coins(CoinTypes.ep, this.getDiceRoll(1, 6) * 10)] as Array<Coins>);
    } else if (roll <= 60) {
      return new Loot([new Coins(CoinTypes.sp, this.getDiceRoll(6, 6) * 10),
      new Coins(CoinTypes.gp, this.getDiceRoll(2, 6) * 10)] as Array<Coins>);
    } else if (roll <= 70) {
      return new Loot([new Coins(CoinTypes.ep, this.getDiceRoll(3, 6) * 10),
      new Coins(CoinTypes.gp, this.getDiceRoll(2, 6) * 10)] as Array<Coins>);
    } else if (roll <= 95) {
      return new Loot([new Coins(CoinTypes.gp, this.getDiceRoll(4, 6) * 10)] as Array<Coins>);
    } else {
      return new Loot([new Coins(CoinTypes.gp, this.getDiceRoll(2, 6) * 10),
      new Coins(CoinTypes.pp, this.getDiceRoll(3, 6))] as Array<Coins>);
    }
  }

  // Challenge Rating 11-16 Monster
  private rollIndividualTreasureTier3(): Loot {
    console.log('rolling for individual treasure tier 3');
    const roll = this.getDiceRoll(1, 100);
    if (roll <= 20) {
      return new Loot([new Coins(CoinTypes.sp, this.getDiceRoll(4, 6) * 100),
      new Coins(CoinTypes.gp, this.getDiceRoll(1, 6) * 100)] as Array<Coins>);
    } else if (roll <= 35) {
      return new Loot([new Coins(CoinTypes.ep, this.getDiceRoll(1, 6) * 100),
      new Coins(CoinTypes.gp, this.getDiceRoll(1, 6) * 100)] as Array<Coins>);
    } else if (roll <= 75) {
      return new Loot([new Coins(CoinTypes.gp, this.getDiceRoll(2, 6) * 100),
      new Coins(CoinTypes.pp, this.getDiceRoll(1, 6) * 10)] as Array<Coins>);
    } else {
      return new Loot([new Coins(CoinTypes.gp, this.getDiceRoll(2, 6) * 100),
      new Coins(CoinTypes.pp, this.getDiceRoll(2, 6) * 10)] as Array<Coins>);
    }
  }

  // Challenge Rating 17+ Monster
  private rollIndividualTreasureTier4(): Loot {
    console.log('rolling for individual treasure tier 4');
    const roll = this.getDiceRoll(1, 100);
    if (roll <= 15) {
      return new Loot([new Coins(CoinTypes.ep, this.getDiceRoll(2, 6) * 1000),
      new Coins(CoinTypes.gp, this.getDiceRoll(8, 6) * 100)] as Array<Coins>);
    } else if (roll <= 55) {
      return new Loot([new Coins(CoinTypes.gp, this.getDiceRoll(1, 6) * 1000),
      new Coins(CoinTypes.pp, this.getDiceRoll(1, 6) * 100)] as Array<Coins>);
    } else {
      return new Loot([new Coins(CoinTypes.gp, this.getDiceRoll(1, 6) * 100),
      new Coins(CoinTypes.pp, this.getDiceRoll(2, 6) * 100)] as Array<Coins>);
    }
  }



  private rollTreasureHordeTier1(): Loot {
    console.log('rolling for treasure horde tier 1')
    const roll = this.getDiceRoll(1, 100);
    const coins = [new Coins(CoinTypes.cp, this.getDiceRoll(6, 6) * 100),
    new Coins(CoinTypes.sp, this.getDiceRoll(3, 6) * 100)] as Array<Coins>;
    // return new Loot(coins,
    //   new Treasure(this.getDiceRoll(2, 6), 10, TreasureTypes.Gem),
    //   this.rollMagicItemHorde(magicTableA, this.getDiceRoll(1, 6))
    // );
    if (roll <= 6) {
      return new Loot(coins);
    } else if (roll <= 16) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 6), 10, TreasureTypes.Gem)
      );
    } else if (roll <= 26) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 4), 25, TreasureTypes.Art)
      );
    } else if (roll <= 36) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 6), 50, TreasureTypes.Gem)
      );
    } else if (roll <= 44) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 6), 10, TreasureTypes.Gem),
        this.rollMagicItemHorde(magicTableA, this.getDiceRoll(1, 6))
      );
    } else if (roll <= 52) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 4), 25, TreasureTypes.Art),
        this.rollMagicItemHorde(magicTableA, this.getDiceRoll(1, 6))
      );
    } else if (roll <= 60) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 6), 50, TreasureTypes.Gem),
        this.rollMagicItemHorde(magicTableA, this.getDiceRoll(1, 6))
      );
    } else if (roll <= 65) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 6), 10, TreasureTypes.Gem),
        this.rollMagicItemHorde(magicTableB, this.getDiceRoll(1, 4))
      );
    } else if (roll <= 70) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 4), 25, TreasureTypes.Art),
        this.rollMagicItemHorde(magicTableB, this.getDiceRoll(1, 4))
      );
    } else if (roll <= 75) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 6), 50, TreasureTypes.Gem),
        this.rollMagicItemHorde(magicTableB, this.getDiceRoll(1, 4))
      );
    } else if (roll <= 78) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 6), 10, TreasureTypes.Gem),
        this.rollMagicItemHorde(magicTableC, this.getDiceRoll(1, 4))
      );
    } else if (roll <= 80) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 4), 25, TreasureTypes.Art),
        this.rollMagicItemHorde(magicTableC, this.getDiceRoll(1, 4))
      );
    } else if (roll <= 85) {
      return new Loot(coins,
        new Treasure(this.getDiceRoll(2, 6), 50, TreasureTypes.Gem),
        this.rollMagicItemHorde(magicTableC, this.getDiceRoll(1, 4))
      );
    } else if (roll <= 92) {

    } else if (roll <= 97) {

    } else if (roll <= 99) {

    } else {

    }
  }


  // magic item logic

  private rollMagicItem(magicTable: [number, MagicItem][]): MagicItem {
    const roll = this.getDiceRoll(1, 100);
    for(const row of magicTable) {
      const chance = row[0];
      const item = row[1];
      if (roll < chance) {
        return item;
      }
    }


    // magicTable.forEach((row: [number, MagicItem]) => {
    //   console.log('row[0]:', row[0]);
    //   if (roll < row[0]) {
    //     console.log('found item');
    //     console.log(row[1]);
    //     return row[1];
    //   }
    // });
    return null;
  }


  private rollMagicItemHorde(magicTable: [number, MagicItem][], count: number): Array<MagicItem> {
    const itemHorde: Array<MagicItem> = [];
    for (let i = 0; i < count; i++) {
      itemHorde.push(this.rollMagicItem(magicTable));
    }
    return itemHorde;
  }

  // private rollMagicTableA(): MagicItem {
  //   const roll = this.getDiceRoll(1, 100);
  //   if (roll <= 50) {
  //     return new MagicItem('Potion of healing', 187);
  //   } else if (roll <= 60) {
  //     return new MagicItem('Spell scroll (cantrip)', 0);
  //   } else if (roll <= 70) {
  //     return new MagicItem('Potion of climbing', 187);
  //   } else if (roll <= 90) {
  //     return new MagicItem('Spell scroll (1st level)', 0);
  //   } else if (roll <= 94) {
  //     return new MagicItem('Spell scroll (2nd level)', 0);
  //   } else if (roll <= 98) {
  //     return new MagicItem('Potion of greater healing', 187);
  //   } else if (roll <= 99) {
  //     return new MagicItem('Bag of holding', 153);
  //   } else {
  //     return new MagicItem('Driftglobe', 166);
  //   }
  // }
}
