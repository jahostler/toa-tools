export class CrawlResult {
    rollPlusMod: number;
    navCheckDC: number;
    navCheckPass: boolean;
    lostDirection?: string;
    encounterResults: EncounterResults;
    public constructor(){}
}

export class EncounterResults {
    morning: number;
    afternoon: number;
    night: number;
    constructor(){
        this.morning = -1;
        this.afternoon = -1;
        this.night = -1;
    }
}