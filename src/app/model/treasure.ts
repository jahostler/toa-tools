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
    public type: TreasureTypes,
    public count: number,
    public value: number
  ){}
}

export class Coins {
  constructor(
    public type: CoinTypes,
    public count: number
  ){}
}

export class Loot {
  constructor(
    public coins: Coins,
    public treasure: Treasure,
    public magicItems: Array<MagicItem>
  ){}
}

export enum TreasureTiers {
  Tier1 = 1,
  Tier2,
  Tier3,
  Tier4
}
