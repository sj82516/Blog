// This is the note about "Eloquent Javascript" Chapter 9 - Regular Expression  

// 1. Declare 
// These two are the same.
var re1 = new RegExp("abc");
var re2 = /abc/;

// 2. Test() : test the input is correspondent with RegExp or not 

console.log(re1.test("abcde")); // true
console.log(/abc/.test("bcdef"));  // false

// 3. [] : Match any of characters in this brackets  

console.log(/[0,1,2,3,4,5]/.test("1992")) // true  
// Ordering defined by Unicode number
console.log(/[0-5]/.test("1992")) // true 

// 4. \ : special characters should follow behind blackslash-escape  
console.log(/hello\+/.test("hello+")); // true

// 5. Common chars groups
// \d : Any digital chars 
console.log(/\d/.test("1234567890")); // true  
// \w : Any word chars
console.log(/\w/.test("helloworld")); // true  
// \s : Any space-like chars 
console.log(/\s/.test("\n\t")) //true
// Capital for reverse, \D : no digital chars 
console.log(/\D/.test("1234567890")); // false

// 6. ^ : match any one not in the sets
console.log(/[^01]/.test("0101201")); // true
console.log(/[^01]/.test("0101001")); // false

// 7. + : element repeat for one more times
console.log(/[1234+]/.test("123444")); // true
// * : similiar with + , can occur zero time
console.log(/[1234*]/.test("123")); // true
// ? : optional, occur one or zero time
console.log(/[1234?]/.test("1234")); // true

// 8. {d} : occur exact d times
console.log(/123{3}/.test("12333")); // true
console.log(/123{1,3}/.test("1233")); // true

// 9. () : group expression  
console.log(/(123){3}/.test("123123123")); // true

// 10. Exec() : return match infomation , more powerful than test(), it would match first one   
var re3 = /123{1,4}/.exec("1222 1233333 1233");
console.log(re3) //[ '123333', index: 5, input: '1222 1233333 1233' ] 
//If there some subexpressions grouped with paren- theses, it would show up in the array!  
var re4 = /'([^']*)'/.exec("123 345 'hello'");
console.log(re4);//[ '\'hello\'', 'hello', index: 8, input: '123 345 \'hello\'' ]
//these should be fully matched (? mark)
console.log(/bad(ly)?/.exec("bad")); // [ 'bad', undefined, index: 4, input: '123 bad' ]
console.log(/bad(ly)?/.exec("badly")); // [ 'badly', ly, index: 4, input: '123 bad' ]

// 11. \b : match the string start or end with the expression , $ : match the string end with the expression  
console.log(/bad$/.test("babad")); // true
console.log(/\b(123)bad/.test("123bad")); // true
console.log(/\b(123)bad(123)\b/.test("123bad123")); // true  

// 12. (||) : match first one from left option to right
console.log(/(123|abc|000)/.test("123123")); // true 
console.log(/(123|abc|000)/.test("123abc")); // false 

// 13. string replace : replace first one , \g : replace all
console.log("papa".replace("p", "m")); // mapa
console.log("Borobudur".replace(/[ou]/, "a")); // Barobudur
console.log("Borobudur".replace(/[ou]/g, "a")); // Barabadar

// 14. string parameters : $_
console.log("Hopper , Grace\nMcCarthy , John\nRitchie , Dennis".replace(/([\w ]+), ([\w ]+)/g, "$2 $1"));

// Note : +,*,?,{} are greedy , they will match as more as possible, if expression not match, it would backtrack.
console.log(/\d+567/.test('1234567'));
//If you want to match these ops as less as possible, turn to +? , *? , ??, {}?.



