### 使用Babel學習ES2015  
主要參考資料：
https://github.com/lukehoban/es6features#readme  

首先有幾個名詞需要釐清  
1.EcmaScript : 語言訂定的規格  
2.Javascript : 實現ES的其中一種語言，也是最常用的 （各家瀏覽器大廠都有不同實作ES的語言，詳見[Wiki](https://zh.wikipedia.org/wiki/ECMAScript)）  
3.ES6 : 指EcmaScript的特一版本(舊名稱)  
4.ES2015 : 改用年份命名ES的版本(新名稱，等同於ES6)  
5.ES Harmony : 條列未來的功能(ES協會[TC39](http://ecma-international.org/memento/TC39.htm)的todo list)  
6.ES.Next : 下一版ES會新增的功能(ES Harmony的子集合)  

在使用ES2015時，因為各家瀏覽器的支援狀況不一，可以用[Babel](https://babeljs.io/) Transpiler（source-to-source compiling），將ES2015轉為舊版的ES5，在支援度上就比較沒有問題，又或是用v6.0.0 Node，支援ES2015 96%的功能。  

Babel提供很多插件與模組，可以整合許多不同的框架與環境，細節可以到官網的setup page查看，這邊我裝的是cli版本。  
安全起見，將babel-cli安裝在local端，一方面避免多個專案使用不同版本問題，另一方面移植也較為方便  
```sh
 $ mkdir ES2015 //創建   
 $ mkdir src lib //src放ES2015 code , 等等會將翻譯完的js放在lib裡   
 $ npm init // 初始化    
 $ npm install --save-dev babel-cli    
 $ 在 packege.json ，加入模組相依性   
```  
```js
  "name": "my-project",
  "version": "1.0.0",
  "devDependencies": {
    "babel-cli": "^6.0.0"
  }
}
```   
在package.json中加入指令    
```diff
  {
    "name": "my-project",
    "version": "1.0.0",
+   "scripts": {
+     "build": "babel src -d lib"
+   },
    "devDependencies": {
      "babel-cli": "^6.0.0"
    }
  }
```  
接著執行  
```js  
npm run build  
```   

接著重頭戲就是學習ES2015的新功能。  
