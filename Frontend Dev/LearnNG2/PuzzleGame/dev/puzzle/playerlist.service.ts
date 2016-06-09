/**
 * Created by zhengyuanjie on 2016/5/30.
 */

import {Injectable} from "angular2/core";
import {Player} from "./player";

@Injectable()

export class PlayerListService{
    private playerList:Array<Player> = new Array();

    getPlayers(){
        return this.playerList;
    }

    insertPlayer(player:Player){
        this.playerList.push(player);
    }

    deletePlayer(player:Player){
        this.playerList.splice(this.playerList.indexOf(player), 1);
    }
}