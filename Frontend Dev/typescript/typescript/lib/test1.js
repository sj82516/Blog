var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
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
function foo() {
    return __awaiter(this, void 0, void 0, function* () {
        yield function bar() {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("Promise1");
                    resolve();
                }, 1000);
            });
        }();
        console.log("Promise work!");
    });
}
;
foo();
//# sourceMappingURL=test1.js.map