import {Ingrediant} from "./ingrediant";
/**
 * Created by zhengyuanjie on 2016/6/3.
 */
export class Recipe {
    name:string;
    imageURL:string;
    intro:string;
    ingrediants:Array<Ingrediant>;
    
    constructor(name:string , imageURL:string, intro:string, ingrediants:Array<Ingrediant>){
        this.name = name;
        this.imageURL = imageURL;
        this.intro = intro;
        this.ingrediants = ingrediants;
    }
}