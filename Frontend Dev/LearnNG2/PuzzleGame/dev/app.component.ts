import {Component, OnInit} from 'angular2/core';
import {StartComponent} from "./puzzle/start.component";
import {PuzzleComponent} from "./puzzle/puzzle.component";
import {Player} from "./puzzle/player";
import {PlayerListService} from "./puzzle/playerlist.service";
import {PlayerEditComponent} from "./puzzle/player-edit.component";

@Component({
    selector: 'my-app',
    template: `
        <h1>Welcome to puzzle game.</h1>
        <section>
            <h3>Game Intro :</h3>
            <p>enter number range from 1 to 9. The game status will show A for correct answer, and B for correct number but in wrong place.</p>
            <p>Start game now by creating a new player or choosing existed player.</p>
        </section>
        <section class="choose-player">
            <div class="create-player">
                <start-component (createNewPlayer)="onCreateNewPlayer($event)"></start-component>
            </div>
            <div *ngIf="playerList.length>0" class="player-list-board">
                <h3> Previous Player Record</h3>
                <player-edit-component *ngIf="selectedPlayer!=null" [player]="selectedPlayer" (deletePlayer)="onDeletePlayer($event)"></player-edit-component>
                <div class="player-list">
                    <div class="player-list-item" *ngFor="let p of playerList;" (click)="onSelect(p)">
                        <p class="player-list-title">{{p.name}}</p>
                        <div class="player-list-content">
                            <p>Age:</p>
                            <p>{{p.age}}</p>
                            <p>Intro:</p>
                            <div>{{p.intro}}</div> 
                        </div>
                    </div>
                 </div>
            </div>
        </section>
        <puzzle-component *ngIf="selectedPlayer!=null" [currentPlayer]="selectedPlayer"></puzzle-component>
    `,
    directives : [StartComponent, PuzzleComponent, PlayerEditComponent],
    providers : [PlayerListService]
})
export class AppComponent implements OnInit{
    playerList: Array<Player>;
    selectedPlayer: Player;

    constructor(private _playerListServoce : PlayerListService){}

    ngOnInit(){
        this.playerList = this._playerListServoce.getPlayers();
        console.log(this._playerListServoce.getPlayers());
    }

    onSelect(p){
        this.selectedPlayer = p;
    }

    onCreateNewPlayer(n){
        this.selectedPlayer = this.playerList[this.playerList.length-1];
    }

    onDeletePlayer(player){
        this._playerListServoce.deletePlayer(player);
        this.selectedPlayer = null;
    }
}
