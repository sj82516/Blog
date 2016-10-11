/// <reference path="./typings/index.d.ts" />

let a:number = 5;

interface Human {
    name: string;
    age: number;
}

class Man implements Human{
    constructor(public name:string, public age:number){};
}

let p1:Human = new Man("hello",15);
console.log(p1);

import * as fs from "fs";
fs.readFile('./test.txt', 'utf-8',(err, data)=>{
    console.log(data);
})
