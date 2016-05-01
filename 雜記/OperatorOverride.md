最近在實作基本資料結構時，希望將資料結構設計符合Polymophism，可以運算基本型態與物件  
像是在Priority Queue，需要比對值進行排序，基本型別倒是沒問題(Number / String)  
但是物件的比對就需要另外設計，甚至需要重構Priority Queue的比對方式  
所以希望透過修改operator運算子方式，用最小力氣達到效果，[此文主要的參考文章](http://www.2ality.com/2011/12/fake-operator-overloading.html)。  
  
Javascript不像C++提供Override operator的方式，但有某些小技巧可以達到fake效果。   
幾個基本觀念的澄清：  
1.JS的變數是弱型別，所以interpreter會依照不同的情況轉換型別  
```Javascript
 var x = 6 + "Hello" // x = "6Hello"
 var x = 6 + 4 + "Hello" // x = "10Hello"  
```
2.運算子有分兩種，一種是會轉變型別(coerce)如:+-*/ < > || & ...，另一種是不轉換型別 '==='   
轉換的機制可以[Annotated ES5](http://es5.github.io/#x11.9.3)，主要是發現不同型別後，呼叫ToNumber,ToBoolean,ToPrimitive function  
其中轉型別部分會將變數轉為基本型別，再轉為兩者相符的型別，以下例子皆節錄主要參考文章 
```Javascript
 0 == false // true  
 1 == "1" //true
 null == undefined // true  
 null === undefined // false!
```
對於轉換物件成基本型別時，會分別驅動 物件本身(如果本身是function，會先執行function) -> valueOf -> toString   
```Javascript
var obj1 = {
    valueOf: function () {
        console.log("valueOf1");
        return 1;
    }
};
var obj2 = {
    valueOf: function () {
        console.log("valueOf2");
        return 2;
    }
};
obj1 + object2 // valueOf1 valueOf2 3  
```
```Javascript
function func(x) {
    console.log("func_" + x);
    return {
        valueOf: function () {
            console.log("valueOf_"+x);
            return {}; // not a primitive
        },
        toString: function () {
            console.log("toString_"+x);
            return 0; // a primitive
        },
    }
}
> func("LEFT") << func("RIGHT") 
--- output ---
func_LEFT
func_RIGHT
valueOf_LEFT
toString_LEFT
valueOf_RIGHT
toString_RIGHT
```
文章後段還有用Object setter做更深入的fake，以後再慢慢欣賞。  

結論：  
JS畢竟不是為OO而生的，想要覆寫個運算子想不到這麼麻煩，不過也意外一瞥JS轉換型別的過程。  

note1.Override：子類複寫父類函示，Overload：同類中有多個相同名稱函數但接受不同的參數，[參考資料](http://www.cnblogs.com/JavaCharp/archive/2010/03/31/1701700.html)
