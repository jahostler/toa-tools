import { Component, OnInit } from '@angular/core';
import { AdvEnum, PaceEnum, Crawl} from '../model/crawl-form'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HexcrawlService} from './hexcrawl.service';
import { CrawlResult, EncounterResults } from '../model/crawl-result';
import { MzModalCloseDirective } from 'ngx-materialize';


@Component({
  selector: 'app-hexcrawl',
  templateUrl: './hexcrawl.component.html',
  styleUrls: ['./hexcrawl.component.css']
})
export class HexcrawlComponent implements OnInit {
  
  public crawlForm: FormGroup;
  public crawlModel: Crawl;
  public submitted: boolean;
  public loading: boolean;

  public crawlPromise: Promise<boolean>;
  public crawlResult: CrawlResult;
  public crawlService: HexcrawlService;


  public modalOptions: Materialize.ModalOptions;

  
  public advTypes: string[] = Object.keys(AdvEnum);
  // public defaultAdvType: string = "None";
  public paceTypes: string[] = Object.keys(PaceEnum);
  // public defaultPaceType: string = "Normal";

  defaultTerrainDC: number = 15;


  constructor(private _fb: FormBuilder) {
    this.crawlService = new HexcrawlService();
   }

  ngOnInit() {
    this.crawlForm = this._fb.group({
      navSkill: ['', Validators.required],
      adv: [this.advTypes[1], Validators.required],
      pace: [this.paceTypes[1], Validators.required],
      terrainDC: ['', Validators.required]
    });

    // this.crawlForm.controls['terrainDC'].setValue(this.defaultTerrainDC, {onlySelf: true});
    this.crawlForm.patchValue({
      terrainDC: this.defaultTerrainDC
    });


    this.modalOptions = {
      dismissible: true,
      opacity: .25,
      inDuration: 200,
      outDuration: 100
    }
  }

  capitalize(str:string){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onSubmit() {
    console.log("starting crawl!");
    this.submitted = true;

    this.loading = true;

    console.log("navSkill: " + this.crawlForm.controls['navSkill'].value);
    console.log("advantage: " + this.crawlForm.controls['adv'].value);
    console.log("pace: " + this.crawlForm.controls['pace'].value);
    console.log("terrainDC: " + this.crawlForm.controls['terrainDC'].value);

    this.crawlModel = new Crawl(
      this.crawlForm.controls['navSkill'].value,
      this.crawlForm.controls['adv'].value,
      this.crawlForm.controls['pace'].value,
      this.crawlForm.controls['terrainDC'].value
    )

    this.getCrawlResult();

    // setTimeout(() => {
    //   // console.log("waiting")
    //   this.crawlResult = this.crawlService.performCrawl(this.crawlModel);

    //   console.log(this.crawlResult);

    //   this.loading = false;
    // }, 2000);

    this.loading = false;
    return this.crawlResult;

  }

  getCrawlResult() {
    this.crawlService.performCrawl(this.crawlModel).subscribe(
      (result: CrawlResult) => {
        this.crawlResult = result;
        console.log("result: " + result);
        this.crawlPromise = Promise.resolve(true);
      },
      error => {
        console.error("could not retrieve results");
      }
    );
  }

}
