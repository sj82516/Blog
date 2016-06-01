/**
 * Created by zhengyuanjie on 2016/5/30.
 */
import {Component, Input, OnInit} from "angular2/core";
import {Player} from "./player";

@Component({
    selector : 'puzzle-component',
    template : `
        <section [ngClass]="{solved:isSolved, unsolved:!isSolved}">
            <h2>Hello {{currentPlayer.name}}</h2>
            <h4>This is your record: {{currentPlayer.winNum}} / {{currentPlayer.playNum}}</h4>
            <h4>Game State : {{gameState}}</h4>
            <p>
                <label for="switch1">Switch1:</label>
                <input type="text" [(ngModel)]="switchVal[0]" (keyup)="onCheckAns(0)">
                <span *ngIf="errorState[0]">Input Error!</span>
            </p>
            <p>
                <label for="switch1">Switch2:</label>
                <input type="text" [(ngModel)]="switchVal[1]" (keyup)="onCheckAns(1)">
                <span *ngIf="errorState[1]">Input Error!</span>
            </p>
            <p>
                <label for="switch1">Switch3:</label>
                <input type="text" [(ngModel)]="switchVal[2]" (keyup)="onCheckAns(2)">
                <span *ngIf="errorState[2]">Input Error!</span>
            </p>
            <p>
                <label for="switch1">Switch4:</label>
                <input type="text" [(ngModel)]="switchVal[3]" (keyup)="onCheckAns(3)">
                <span *ngIf="errorState[3]">Input Error!</span>
            </p>
            <p *ngIf="!isSolved">Wana give up? <button (click)="onNewGame()">Try again</button>
            <p *ngIf="isSolved">Congradulation! Start new game? <button (click)="onNewGame()">New Game</button></p>
        </section>
    `
})

export class PuzzleComponent implements OnInit{
    isSolved:boolean;
    gameState:string;
    switchAns:Array<number> = new Array(4);
    switchVal:Array<string> = new Array(4);
    errorState:Array<boolean> = new Array(4);
    ansState:Array<number> = new Array(4);

    @Input() currentPlayer:Player;

    ngOnInit(){
        this.initGame();
    }

    onCheckAns(pos){
        this.ansState = Array.apply(null, Array(4)).map(()=>{return 0});
        this.isSolved = false;
        if(this.switchVal[pos] > 9 || this.switchVal[pos]<0){
            this.errorState[pos] = true;
            return;
        }
        this.errorState[pos] = false;

        for(let i in this.switchVal){
            if(this.switchAns[i]==this.switchVal[i]){
                this.ansState[i] = 2;
                continue;
            }
            for(let j in this.switchAns){
                if(this.switchAns[j]==this.switchVal[i] && this.ansState[j]<2){
                    this.ansState[j] = 1;
                }
            }
        }

        this.updateGameState();
    }

    updateGameState(){
        let state1=0,state2=0;
        for(let i of this.ansState){
            if(i == 1){
                state1++;
            }
            if(i == 2){
                state2++;
            }
        }
        if(state2==4){
            this.isSolved = true;
            this.currentPlayer.winNum++;
        }
        this.gameState = state2 + 'A' +state1 + 'B';
    }

    onNewGame(){
        this.initGame();
        this.currentPlayer.playNum++;
    }

    initGame(){
        this.isSolved = false;
        this.gameState = '0A0B';
        this.switchAns = Array.apply(null, Array(4)).map(()=>{
            return Math.floor(Math.random()*8+1);
        });
        this.switchVal = Array.apply(null, Array(4)).map(()=>{return 0});
        this.errorState = Array.apply(null, Array(4)).map(()=>{return false});
        this.ansState = Array.apply(null, Array(4)).map(()=>{return 0});
        console.log(this.switchAns);
    }
}