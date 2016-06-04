/**
 * Created by zhengyuanjie on 2016/6/3.
 */
import {Injectable} from '@angular/core';
import {Ingrediant} from "../shared/ingrediant";
import {Recipe} from "../shared/recipe";

@Injectable()

export class RecipeService {
    recipes: Array<Recipe>;

    getItem(index:number){
        return this.recipes[index];
    }

    getAllItems(){
        return this.recipes;
    }

    insertItem(item:Recipe){
        this.recipes.push(item);
    }

    insertItems(items:Array<Recipe>){
        Array.prototype.push.apply.(this.recipes, items);
    }

    getItemIndex(item:Recipe){
        return this.recipes.indexOf(item);
    }

    removeItem(item:Recipe){
        this.recipes.splice(this.recipes.indexOf(item), 1);
    }

    updateItem(index:number, item:Recipe){
        this.recipes[index] = item;
    }
}