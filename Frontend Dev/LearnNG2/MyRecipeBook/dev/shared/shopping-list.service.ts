import {Injectable} from '@angular/core';
import {Ingrediant} from "./ingrediant";

@Injectable()

export class ShoppingListService {
    shoppingList: Array<Ingrediant>;

    getItem(index:number){
        return this.shoppingList[index];
    }

    getAllItems(){
        return this.shoppingList;
    }

    insertItem(item:Ingrediant){
        this.shoppingList.push(item);
    }

    insertItems(items:Array<Ingrediant>){
        Array.prototype.push.apply.(this.shoppingList, items);
    }

    getItemIndex(item:Ingrediant){
        return this.shoppingList.indexOf(item);
    }

    removeItem(item:Ingrediant){
        this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
    }

    updateItem(index:number, item:Ingrediant){
        this.shoppingList[index] = item;
    }
}