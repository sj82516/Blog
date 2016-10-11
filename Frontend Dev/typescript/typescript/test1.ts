
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

async function foo(){
    await function bar() {
        return new Promise((resolve)=>{
            setTimeout(()=>{
                console.log("Promise1");
                resolve()
            }, 1000);
        })
    }()
    console.log("Promise work!");
};

foo();
