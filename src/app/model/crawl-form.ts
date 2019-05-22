export enum AdvEnum {
    Advantage = "Advantage",
    None = "None",
    Disadvantage = "Disadvantage"
}

export enum PaceEnum {
    Fast = "Fast",
    Normal = "Normal",
    Slow = "Slow"
}

export class Crawl {
    
    constructor(
        public survivalMod: number,
        public advCheck: AdvEnum,
        public pace: PaceEnum,
        public terrainDC: number
    ){}
}