/// <reference path="./typings/index.d.ts" />
"use strict";
let a = 5;
class Man {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    ;
}
let p1 = new Man("hello", 15);
console.log(p1);
const fs = require("fs");
fs.readFile('./test.txt', 'utf-8', (err, data) => {
    console.log(data);
});
//# sourceMappingURL=index.js.map