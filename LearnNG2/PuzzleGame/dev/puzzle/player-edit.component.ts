/**
 * Created by zhengyuanjie on 2016/5/31.
 */
import {Component, Input, EventEmitter, Output} from 'angular2/core'
import {Player} from "./player";
import {PlayerListService} from "./playerlist.service";

@Component({
    selector: 'player-edit-component',
    template: `
        <div class="player-edit-area">
            <span>Name:</span>
            <input type="text" [(ngModel)]="player.name">
            <span>Age:</span>
            <input type="text" [(ngModel)]="player.age">
            <span>Intro:</span>
            <input type="text" [(ngModel)]="player.intro">
            <button (click)="delete()">Delete</button>
        </div>
    `
})

export class PlayerEditComponent{
    @Input() player: Player;
    @Output() deletePlayer:EventEmitter<Player> = new EventEmitter();
    
    delete(){
        this.deletePlayer.emit(this.player);
    }
}