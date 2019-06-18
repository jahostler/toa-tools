import { Component, OnInit } from '@angular/core';
import {DiceRoll} from '../model/dice-roll';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.css']
})
export class DiceRollerComponent implements OnInit {

  result: number;

  name = new FormControl('');

  diceCount = new FormControl();
  diceType = new FormControl();

  myForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    // this.myForm = this.formBuilder.group({
    //   diceCount: ['',],
    //   diceType: ['']
    // });
  }

  // convenience getter for easy access to form fields
  // get f() { return this.myForm.controls; }

  rollDice() {

    // var c = this.diceCount.value
    // var d = parseInt(this.diceType.value.substring(1))

    // var arr = new Array<number>();

    // console.log("count: " + this.diceCount.value);
    // console.log("type: " + this.diceType.value);

    // this.result = 0;
    // for(var i = 0; i < c; i++) {
    //   var roll = Math.ceil(Math.random()*d)
    //   console.log(roll);
    //   arr.push(roll);
    //   this.result += roll;
    // }

    // this.getDiceRoll(c,d)


  }

  public getDiceRoll(n: number,  value: number) {
    let result = 0;
    for(let i = 0; i < value; i++) {
      let roll = Math.ceil(Math.random()*n)
      console.log(roll);
      result += roll;
    }
    return result;
  }

}
