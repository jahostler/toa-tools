export enum TreasureTypes {
  Gem,
  Art
}

export enum CoinTypes {
  cp = 'CP',
  sp = 'SP',
  ep = 'EP',
  gp = 'GP',
  pp = 'PP'
}

export class MagicItem {
  constructor(
    public name: string,
    public page: number
  ){}
}

export class Treasure {
  constructor(
    public count: number,
    public value: number,
    public type: TreasureTypes,
  ){}
}

export class Coins {
  constructor(
    public type: CoinTypes,
    public count: number
  ) {}
}

export class Loot {
  // public coins?: Array<Coins> = [];
  // public treasure?: Array<Treasure> = [];
  // public magicItems?: Array<MagicItem> = [];

  constructor(
    public coins?: Array<Coins>,
    public treasure?: Treasure,
    public magicItems?: Array<MagicItem>
  ) {}

}

export enum TreasureTiers {
  Tier1 = 1,
  Tier2,
  Tier3,
  Tier4
}

export enum MagicTables {
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
}

export class TreasureModel {
  constructor(
    public cr: TreasureTiers,
    public type: string
  ) {}
}
