import {Component, OnInit, EventEmitter, Output} from "angular2/core";
import {FormBuilder, ControlGroup, Validators, Control} from "angular2/common";
import {PlayerListService} from "./playerlist.service";
import {Player} from "./player";

@Component({
    selector : 'start-component',
    template : `
        <h3>Register New Player</h3>
        <form [ngFormModel]="myForm" (ngSubmit)="onSubmit()">
            <div class="input">
                <label for="name">Name:</label>
                <input [ngFormControl]="myForm.controls['name']" type="text" placeholder="3~10 chars.">
            </div>
            <div class="input">
                <label for="age">Age:</label>
                <input [ngFormControl]="myForm.controls['age']" type="text" placeholder="from 0 to 120.">
            </div>
            <div class="input">
                <label for="introduction" >Intro:</label>
                <input [ngFormControl]="myForm.controls['intro']" type="text" placeholder="10 ~ 30 chars.">
            </div>
            <button type="submit" [disabled]="!myForm.valid">Submit</button>
        </form>
    `,
})

export class StartComponent implements OnInit{
    myForm:ControlGroup;
    @Output() createNewPlayer:EventEmitter<number> = new EventEmitter();

    constructor(private _formBuilder: FormBuilder, private _playerListService: PlayerListService){}

    ngOnInit(){
        this.myForm = this._formBuilder.group({
            'name' : ['', Validators.required],
            'age' : ['', Validators.compose([
                ageValidation,
                Validators.required
            ])],
            'intro' : ['', Validators.compose([
                introValidation,
                Validators.required
            ])],
        });
    }

    onSubmit(){
        this._playerListService.insertPlayer({name: this.myForm.value['name'], age: this.myForm.value['age'], intro: this.myForm.value['intro'], winNum: 0, playNum: 1});
        this.createNewPlayer.emit(1);
    }
}

function ageValidation(control : Control): {[s:string]: boolean}{
    if(control.value < 0 || control.value > 120){
        return {outOfRange:true};
    }
}

function introValidation(control: Control) : {[s:string]: boolean}{
    if(control.value.length>30 || control.value.length<10){
        return {inValidLength:true};
    }
}